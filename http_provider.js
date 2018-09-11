const HTTP_PROVIDER = require("xmlhttprequest").XMLHttpRequest;
const JSONRPC_VERSION='2.0';

function requestBody(id,method,params){
	return {id:id,method:method,params:params,jsonrpc:JSONRPC_VERSION};
}
var http_provider = (endpoint, request_id, request_method, request_params,logger)=>{

	return new Promise((resolve, reject)=>{

		var provider = new HTTP_PROVIDER();
		provider.open("POST",endpoint);
		provider.setRequestHeader("Content-Type", "application/json");
		logger.log("[HTTP Request]:");
		logger.log(JSON.stringify(requestBody(request_id,request_method,request_params)));
		provider.send(JSON.stringify(requestBody(request_id,request_method,request_params)));
		provider.onreadystatechange = ()=>{
			 if(provider.readyState === 4){
				if(provider.status==200){
					logger.log("[HTTP Response]:");
					logger.log(provider.responseText);
					resolve(JSON.parse(provider.responseText));
				}else{
					logger.log("[HTTP_PROVIDER ERROR]:");
					logger.log(provider.responseText);
					reject(Error(JSON.parse(provider.responseText)));
				}
			}
		}

	});
};
module.exports=http_provider;