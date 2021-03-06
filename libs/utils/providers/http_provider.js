const HTTP_PROVIDER = require("http");

function requestBody(id,method,params,rpc_version){
	return {id:id,method:method,params:params,jsonrpc:rpc_version};
}

var http_provider = {
	sendRequest : (endpoint, request_id, request_method, request_params,rpc_version,logger,log_visible)=>{
		//logger.log(endpoint);
		return new Promise((resolve, reject)=>{

			// var provider = new HTTP_PROVIDER();
			// provider.open("POST",endpoint);
			// provider.setRequestHeader("Content-Type", "application/json");
			// //provider.setRequestHeader("")
			// logger.log(endpoint);
			// logger.log("[HTTP Request]:");
			// logger.log(JSON.stringify(requestBody(request_id,request_method,request_params,rpc_version)));
			// provider.send(JSON.stringify(requestBody(request_id,request_method,request_params,rpc_version)));
			// provider.onreadystatechange = ()=>{
			// 	 if(provider.readyState === 4){
			// 		if(provider.status==200){
			// 			logger.log("[HTTP Response]:");
			// 			logger.log(provider.responseText);
			// 			resolve(JSON.parse(provider.responseText));
			// 		}else{
			// 			logger.log("[HTTP_PROVIDER ERROR]:");
			// 			logger.log(provider.responseText);
			// 			reject(Error(provider.responseText));
			// 		}
			// 	}
			// }

			let endpoint_vals = endpoint.split(":");
			// console.log(endpoint_vals[0]);
			// console.log(endpoint_vals[1]);
			let req = HTTP_PROVIDER.request({
				host: endpoint_vals[0],
				port: endpoint_vals[1],
				method: "POST",
				headers:{
					"Content-Type":"application/json; charset=UTF-8"
				}
			},(res)=>{
				let resp = "";
				res.setEncoding('utf8')
				res.on("data",(data)=>{
					resp=resp + data;

				});
				res.on('end',()=>{
					//console.log("closed connection"+ request_id);
					logger.log("[HTTP Response]",log_visible);
					logger.log(resp);
					resolve(JSON.parse(resp));
				});
			});

			req.on("error",(e)=>{
				logger.error("[HTTP ERROR]");
				logger.error(e);
				reject(e);
			})

			let payload = JSON.stringify(requestBody(request_id,request_method,request_params,rpc_version));
			logger.log("[HTTP Request]",log_visible);
			logger.log(payload,log_visible);
			req.write(payload);
			req.end();

		});
	},
	sendRaw:(endpoint,jsonString,logger,log_visible)=>{
			return new Promise((resolve, reject)=>{
		let endpoint_vals = endpoint.split(":");
		// console.log(endpoint_vals[0]);
		// console.log(endpoint_vals[1]);
		let req = HTTP_PROVIDER.request({
			host: endpoint_vals[0],
			port: endpoint_vals[1],
			method: "POST",
			headers:{
				"Content-Type":"application/json; charset=UTF-8"
			}
		},(res)=>{
			let resp = "";
			res.setEncoding('utf8')
			res.on("data",(data)=>{
				resp=resp + data;

			});
			res.on('end',()=>{
				//console.log("closed connection"+ request_id);
				logger.log("[HTTP Response]",log_visible);
				logger.log(resp);
				resolve(JSON.parse(resp));
			});
		});

		req.on("error",(e)=>{
			logger.error("[HTTP ERROR]");
			logger.error(e);
			reject(e);
		})

		logger.log("[HTTP Request]",log_visible);
		logger.log(jsonString,log_visible);
		req.write(jsonString);
		req.end();

	})
	}
}

module.exports=http_provider;
