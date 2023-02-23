## refine-xr

Refine-XR is a CRUD application to create and publish WebXR experiences easily on the web without writing any code. It integrates with numerous WebXR solutions, including WebXR API, MindAR SDK, AFRAME/ThreeJS AR/VR, etc.

## Source Code
This repo consists of two main components. 

#### fake-rest-server
Fake-Rest-Server is a fake REST api server for local development. It's based on `https://github.com/typicode/json-server`

#### nextjs-app
NextJS app is a refine based NextJS application. IT's based on `https://refine.dev/` It contains the CMS for creating and deploy webXR experiences.

## Development

#### 1. Update the environment variables (nextjs-app)

`> cp .env.example .env.local`

There are two required URL configs.

API_URL: This is the url of the rest API endpoint (url of the fake-rest-server or the url of a real REST api server)
XR_SERVE_URL: This is the url of nextjs-app. 

Normally you can run the both servers and test on your desktop browsers using localhost without problem, i.e.
```
API_URL=http://localhost:4000
XR_SERVE_URL=http://localhost:3000
```

__In fact, if you don't need to test on mobile devices, you can just use the above environment variables and only do `Step 2` and `Step 3`.__


However, because it's a webXR application, so you most likely want to test it with a mobile device connected to the same network. To do that, we will need to know your desktop local network IP.
You can find it by using, for example, `> ifconfig`. Let's assume your ip is `192.168.0.1` first.

Also, it requires HTTPS to use webcam, which is required in XR application. So update the .env.local to
```
API_URL=https://192.168.0.1:4001
XR_SERVE_URL=https://192.168.0.1:3001
```
We will explain why the ports are 4001 and 3001 later.


#### 2. Start the fake-rest-server

open a new terminal:
`> cd fake-rest-server && npm run dev`

It should starts on port 4000

#### 3. Start the nextJS server

open a new terminal:
`> cd nextjs-app && npm run dev`

It should starts on port 3000

#### 4. run a local ssl proxy 

Since the servers start with HTTP, we need to create a ssl proxy to serve the clients with https. There are many ways to do that, but here we use `local-ssy-proxy` (Ref: https://github.com/cameronhunter/local-ssl-proxy) to proxy a secure port. 

Install local-ssl-proxy
`> npm install -g local-ssl-proxy`

open a new terminal:
`> local-ssl-proxy --source 3001 --target 3000` 

open a new terminal:
`> local-ssl-proxy --source 4001 --target 4000` 

#### Summary
In summary, you should have four processes running. 

1. fake-rest-server, listening on port 4000
2. nextjs-app, listening on port 3000
3. local-ssl-proxy (3001 -> 3000)
4. local-ssl-proxy (4001 -> 4000)

Then your app should be running on your desktop http://localhost:3000 or https://localhost:3001





