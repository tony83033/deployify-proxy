const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const PORT  = 8000;

const BASE_PATH = "https://deployify-project.s3.ap-south-1.amazonaws.com/__output";

const proxy = httpProxy.createProxy();
app.use((req,res)=>{
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    const resolvesTo = `${BASE_PATH}/${subdomain}`;

   return proxy.web(req,res,{target:resolvesTo , changeOrigin: true});
})

app.get("/health",(req,res)=>{
    return res.send("ok");
})

app.get("/sumit",(req,res)=>{

    // const hostname = req.hostname;
    // const subdomain = hostname.split('.')[0];

    const resolvesTo = `https://deployify-project.s3.ap-south-1.amazonaws.com/__output/vite2/index.html`;

   return proxy.web(req,res,{target:resolvesTo , changeOrigin: true});

})
app.get('/',(res,req)=>{
    return res.send("welcome to deployify");
})

proxy.on('proxyReq',(proxyReq,req,res)=>{
    const url = req.url;
    if(url === '/'){
        proxyReq.path +='index.html';
        
    }
    
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})