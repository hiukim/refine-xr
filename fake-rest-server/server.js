// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const multer = require('multer')
const express = require('express');
const path = require('path');

const UPLOAD_PATH = "/uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, UPLOAD_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
const fileUpload = upload.fields([{name: "file"}]);

server.use(middlewares)

server.post("/media/upload", fileUpload, (req, res) => {
  const path = req.protocol + '://' + req.get('host') + UPLOAD_PATH + "/" + req.files.file[0].filename;
  res.json({url: path}); 
});

server.use("/uploads", express.static('uploads'))

server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})
