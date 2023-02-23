# refine-XR

# About 
Refine-XR is a CRUD-based management system that enables users to manage 3D assets and create web-based XR applications without requiring any programming expertise.

The system comprises a 3D viewer within the admin dashboard, enabling users to configure WebXR experiences using various input options. Additionally, users can directly publish their experiences within the system.

In principle, Refine-XR can integrate with any type of WebXR solutions or frameworks via extensions. Currently, the system supports markerless AR experiences, image tracking AR experiences as well as VR experiences.

# Source Code
This repo consists of two main components. 

#### fake-rest-server
fake-rest-server is a fake REST api server for local development, based on json-server. Ref: `https://github.com/typicode/json-server`

#### nextjs-app
nextjs-app is a refine based NextJS application. It is the main CMS for creating and managing webXR experiences. Ref: `https://refine.dev/`

# Development

#### 1. Update the environment variables (nextjs-app)

`> cp .env.example .env.local`

There are two required URL configs.

API_URL: The url of the rest API endpoint (url of the fake-rest-server or the url of other REST api server)

XR_SERVE_URL: The url of nextjs-app. 

Normally you can run both servers and test on your desktop browser using localhost without problem, e.g:

```
API_URL=http://localhost:4000
XR_SERVE_URL=http://localhost:3000
```

__In fact, if you don't need to test on mobile devices, you can simply use the above variables and go to `Step 2` and `Step 3`.__

However, because the system will publish WebXR experiences, which you might want to test with mobile devices. To do that, your mobile devices and desktop running the servers have to be connected to the same local network. We also need to configure the servers' environment variables to include the server IP addresses so the mobile devices can access the published webpages. Therefore, it involves some extra work.

Let's assume your desktop local ip address is `192.168.0.1` (You can find out using `ifconfig` command is needed). Besides, mobile browsers mostly require HTTPS in order to access the webcam, which is needed in XR applications. So we also need to enable HTTPS. There are numerous ways to do that, but in this development guide, we will use a simple SSL proxy with a self-signed certificate. 

Now, update the `.env.local` to the following:

```
API_URL=https://192.168.0.1:4001
XR_SERVE_URL=https://192.168.0.1:3001
```

We will explain why the ports are 4001 and 3001 in Step 4.

#### 2. Start the fake-rest-server

open a new terminal:
`> cd fake-rest-server && npm run dev`

The server should start on port 4000

#### 3. Start the nextJS server

open a new terminal:
`> cd nextjs-app && npm run dev`

The server should start on port 3000

#### 4. run a local ssl proxy 

We use `local-ssl-proxy` to map port 3001 (https) to 3000 (http) , and port 4001 (https) to 4000 (http)

Ref: https://github.com/cameronhunter/local-ssl-proxy

4.1 Install local-ssl-proxy (if you havent done that)
`> npm install -g local-ssl-proxy`

4.2 open a new terminal:
`> local-ssl-proxy --source 3001 --target 3000` 

4.3 open a new terminal:
`> local-ssl-proxy --source 4001 --target 4000` 

#### Summary
If everything works well, you should have four processes running locally: 

1. fake-rest-server, listening on port 4000
2. nextjs-app, listening on port 3000
3. local-ssl-proxy (3001 -> 3000)
4. local-ssl-proxy (4001 -> 4000)

and your system should be running on http://localhost:3000 or https://localhost:3001

