var chaiMatchPattern = require('chai-match-pattern');
var chai= require("chai");
chai.use(chaiMatchPattern);
var expect = chai.expect;
var _ = chaiMatchPattern.getLodashModule();
var utils = require("./utils2");



var H160= /^0x[0-9a-f]{160}$/;
var H256= /^0x[0-9a-f]{256}$/;
var H64=/^0x[0-9a-f]{64}$/;
var HEX=/^0x[0-9a-f]*$/;
var JAVA_HEX = /^[0-9a-f]*$/
var BINARY=()=>{return {test:(val)=>(/^0x[0-9a-f]*$/.test(val) && val.length%2===0)}};



var code_format = HEX;
var transaction_format = H64;
var blockHash_format =  H64;
var account_format = H64;
var public_key = H64;
var NULL_N_HEX = ()=>{
		return {test:(value)=>{return HEX.test(value)|| _.isNull(value);}};
	}
var NULL_N_INT = ()=>{return {test:(value)=>{return _.isNull(value) || _.isNumber(value);}}};

_.mixin({
	isNull_N_Hex: function(elem){
		return HEX.test(elem)|| _.isNull(elem);
	},
	isNull_N_Hex64: function(elem){
		return /^0x[0-9a-f]{64}$/.test(elem) || _.isNull(elem);
	},
	isBinary: function(elem){
		return /^0x[0-9a-f]*$/.test(elem) && val.length%2===0;
	},
	isAccountFormat: function(elem){
		return /^0xa0[0-9a-f]{62}$/.test(elem);
	}
})



const VALID_BLOCK_OBJECT={
	difficulty:HEX,
	extraData:HEX,
	gasLimit:HEX,
	gasUsed:HEX,
	nrgUsed:HEX,
	nrgLimit:HEX,
	hash:H64,
	logsBloom:HEX,
	miner:H64,
	nonce:NULL_N_HEX,
	number:HEX,
	parentHash:H64,
	receiptsRoot:H64,
	size:HEX,
	solution:NULL_N_HEX,
	stateRoot:H64,
	timestamp:HEX,
	totalDifficulty:HEX,
	transactions:_.isArray,
	transactionsRoot:transaction_format
}

const VALID_FULL_MINED_BLOCK_OBJECT = `{
		difficulty:/^0x[0-9a-f]*$/,
		extraData:/^0x[0-9a-f]*$/,
		gasLimit:/^0x[0-9a-f]*$/,
		gasUsed:/^0x[0-9a-f]*$/,
		nrgUsed:/^0x[0-9a-f]*$/,
		nrgLimit:/^0x[0-9a-f]*$/,
		hash:/^0x[0-9a-f]{64}$/,
		logsBloom:/^0x[0-9a-f]*$/,
		miner:/^0x[0-9a-f]{64}$/,
		nonce:/^0x[0-9a-f]*$/,
		number:/^0x[0-9a-f]*$/,
		parentHash:/^0x[0-9a-f]{64}$/,
		receiptsRoot:/^0x[0-9a-f]{64}$/,
		size:/^0x[0-9a-f]*$/,
		solution:_.isNull,
		stateRoot:/^0x[0-9a-f]{160}$/,
		timestamp:/^0x[0-9a-f]*$/,
		totalDifficulty:/^0x[0-9a-f]*$/,
		transactions:{
			<=: {
				nrgPrice:/^0x[0-9a-f]*$/,
				nrg:/^0x[0-9a-f]*$/,
				transactionIndex:/^0x[0-9a-f]*$/,
				nonce:/^0x[0-9a-f]*$/,
				input:/^0x([0-9a-f]{2})*$/,
				blockNumber:/^0x[0-9a-f]{64}$/,
				gas:/^0x[0-9a-f]*$/,
				gasPrice:/^0x[0-9a-f]*$/,
				from:/^0x[0-9a-f]{64}$/,
				to:/^0x[0-9a-f]{64}$/,
				value:/^0x[0-9a-f]*$/,
				hash:/^0x[0-9a-f]{64}$/,
				timestamp:/^0x[0-9a-f]*$/
			}
		},
		transactionsRoot:/^0x[0-9a-f]{64}$/
}
`
const VALID_FULL_PENDING_BLOCK_OBJECT = `{
		difficulty:/^0x[0-9a-f]*$/,
		extraData:/^0x[0-9a-f]*$/,
		gasLimit:/^0x[0-9a-f]*$/,
		gasUsed:/^0x[0-9a-f]*$/,
		nrgUsed:/^0x[0-9a-f]*$/,
		nrgLimit:/^0x[0-9a-f]*$/,
		hash:/^0x[0-9a-f]{64}$/,
		logsBloom:/^0x[0-9a-f]*$/,
		miner:_.isNull,
		nonce:_.isNull,
		number:/^0x[0-9a-f]*$/,
		parentHash:/^0x[0-9a-f]{64}$/,
		receiptsRoot:/^0x[0-9a-f]{64}$/,
		size:/^0x[0-9a-f]*$/,
		solution:/^0x[0-9a-f]*$/,
		stateRoot:/^0x[0-9a-f]{160}$/,
		timestamp:/^0x[0-9a-f]*$/,
		totalDifficulty:/^0x[0-9a-f]*$/,
		transactions:{
			<=: {
				nrgPrice:/^0x[0-9a-f]*$/,
				nrg:/^0x[0-9a-f]*$/,
				transactionIndex:/^0x[0-9a-f]*$/,
				nonce:/^0x[0-9a-f]*$/,
				input:/^0x([0-9a-f]{2})*$/,
				blockNumber:/^0x[0-9a-f]{64}$/,
				gas:/^0x[0-9a-f]*$/,
				gasPrice:/^0x[0-9a-f]*$/,
				from:/^0x[0-9a-f]{64}$/,
				to:/^0x[0-9a-f]{64}$/,
				value:/^0x[0-9a-f]*$/,
				hash:/^0x[0-9a-f]{64}$/,
				timestamp:/^0x[0-9a-f]*$/
			}
		},
		transactionsRoot:/^0x[0-9a-f]{64}$/
}
`


const VALID_SYNCING_INFO = {
       startingBlock: HEX,
       currentBlock: HEX,
       highestBlock: HEX
			 // ,
       // blockGap: _.isArray
};

const VALID_TRANSACTION_RECEIPT = {
	    blockHash:  NULL_N_HEX,
        blockNumber:  NULL_N_HEX,
        contractAddress:  NULL_N_HEX,
        cumulativeGasUsed:  HEX,
        from:  account_format,
        to: account_format,
        gasUsed:  HEX,
			//	gasPrice: HEX,
        logs: _.isArray,
        logsBloom:H256,
        /*Quantity - ‘0x0’ indicates transaction failure , ‘0x1’ indicates transaction success. Set for blocks mined after Byzantium hard fork EIP609, null before.*/
        status:HEX,
        transactionHash:transaction_format,
        transactionIndex: HEX,
        cumulativeNrgUsed: HEX,
        nrgPrice:HEX,
				gasPrice:HEX,
        nrgUsed:HEX,
				nrgLimit:HEX,
				gasLimit:HEX

}
const VALID_FULL_TRANSACTION_RECEIPT=`{
	blockHash:  _.isNull_N_Hex,
	blockNumber:  _.isNull_N_Hex,
	contractAddress:  _.isNull_N_Hex,
	cumulativeGasUsed:  /^0x[0-9a-f]*$/,
	from:  /^0x[0-9a-f]*$/,
	to: /^0x[0-9a-f]*$/,
	gasUsed:  /^0x[0-9a-f]*$/,
	logs: {
		<=: {
			address:/^0x[0-9a-f]{64}$/,
			logIndex: /^0x[0-9a-f]*$/,
			data: /^0x[0-9a-f]*$/,
			topics:_.isArray,
			blockNumber: /^0x[0-9a-f]*$/,
			transactionIndex: /^0x[0-9a-f]*$/
		}
	}
	logsBloom:/^0x[0-9a-f]{256}$/,
	status:/^0x[0-9a-f]*$/,
	transactionHash:/^0x[0-9a-f]{64}$/,
	transactionIndex:/^0x[0-9a-f]*$/,
	cumulativeNrgUsed: /^0x[0-9a-f]*$/,
	nrgPrice:/^0x[0-9a-f]*$/,
	gasPrice:/^0x[0-9a-f]*$/,
	nrgUsed:/^0x[0-9a-f]*$/,
	nrgLimit:/^0x[0-9a-f]*$/,
	gasLimit:/^0x[0-9a-f]*$/
}`



const TX_OBJECT= {
	blockHash:NULL_N_HEX,
	blockNumber:NULL_N_HEX,
	chainId:NULL_N_HEX,
	contractAddress:NULL_N_HEX,
	from:account_format,
	gas:HEX,
	gasPrice:HEX,
	hash:transaction_format,
	input:BINARY,
	nonce:HEX,

	timestamp:HEX,
	to:account_format,
	transactionIndex:NULL_N_HEX,
	value:HEX,
	nrg:HEX,
	nrgPrice:HEX
}



const VALID_SIGN_TRANSACTION = {
	raw: HEX,
	tx:{
		nrgPrice:HEX,
		gasPrice:HEX,
		input:HEX,
		nrg:HEX,
		gas:HEX,
		to: account_format,
		nonce:HEX,
		value:HEX,
		hash:transaction_format,
		timestamp:HEX,
		signature:HEX,
		type:_.isString
	}
}



const COMPILE_RESUILT={

		code:HEX,
		info:{
			abiDefinition:_.isArray,
			compilerVersion:_.isString,
			language:_.isString,
			languageVersion:_.isString,
			source:_.isString
		}

}

const VALID_WORKTEMPLATE={
	blockBaseReward:JAVA_HEX,
 	blockTxFee:JAVA_HEX,
 	headerHash:JAVA_HEX,
	height:_.isNumber,
	previousblockhash:JAVA_HEX,
	target:_.isJAVA_HEX
}


const VALID_LOGS={

}

var VALID_BLOCK_HEADER = {
	blockHeader:{
		coinBase:JAVA_HEX,
		difficulty:JAVA_HEX,
		energyConsumed:JAVA_HEX,
		energyLimit:JAVA_HEX,
		extraData:JAVA_HEX,
		logsBloom:JAVA_HEX,
		number:JAVA_HEX,
		parentHash:JAVA_HEX,
		receiptTrieRoot:JAVA_HEX,
		stateRoot:JAVA_HEX,
		timestamp:JAVA_HEX,
		txTrieRoot:JAVA_HEX,
		version:_.isString
	},
	code:_.isNumber,
	headerHash:JAVA_HEX,
	message:_.isNull,
	nonce:JAVA_HEX,
	solution:JAVA_HEX
}


var formats ={

		TRANSACTION_HASH:transaction_format,
		ACCOUNT_FORMAT:_.isAccountFormat,
		HEX:HEX,
		H160:H160,
		CONTRACT_VALUE_FORMAT:HEX,
		BALANCE_FORMAT:HEX,
		BLOCK_NUMBER_FORMAT:_.isNumber,
		BOOLEAN:_.isBoolean,
		ARRAY:_.isArray,
		STRING:_.isString,
		BINARY:BINARY,
		NUMBER:_.isNumber,
		NULL:_.isNull,

		VALID_BLOCK_OBJECT:VALID_BLOCK_OBJECT,
		VALID_FULL_BLOCK_OBJECT:VALID_FULL_MINED_BLOCK_OBJECT,
		VALID_PENDING_BLOCK_OBJECT:VALID_FULL_PENDING_BLOCK_OBJECT,
		VALID_SYNCING_INFO:VALID_SYNCING_INFO,
		VALID_TRANSACTION_RECEIPT:VALID_TRANSACTION_RECEIPT,
		VALID_FULL_TRANSACTION_RECEIPT:VALID_FULL_TRANSACTION_RECEIPT,
		VALID_WORKTEMPLATE:VALID_WORKTEMPLATE,
		VALID_SIGN_TRANSACTION:VALID_SIGN_TRANSACTION,
		VALID_TX:TX_OBJECT,
		COMPILE_RESUILT:COMPILE_RESUILT,
		VALID_TX_RECEIPT:VALID_TRANSACTION_RECEIPT,
		RPC_MODULES:{
			eth:'1.0',
			net:'1.0',
			personal:'1.0',
			pubsub:'1.0',
			rpc:'1.0',
			stratum:'1.0',
			web3:'1.0',
			ping:'1.0'
		},

		VALID_BLOCK_HEADER:VALID_BLOCK_HEADER,

		LOCKED_ERROR:{
			code:2,
			message:"Unauthorized",
			data:"NotUnlocked"
		},
		LOCKED_INVALID_ACC_ERROR:{
			code:2,
			message:"Unauthorized",
			data:"SStore(InvalidAccount)"
		},
		PARAMS_FORMAT_ERROR:`{
			code:-32602,
			message:_.isString
			...
		}`,


		// WRONG_PW_ERROR:{
		// 	code:-32023,
		// 	message:_.isString,
		// 	data:"InvalidPassword"
		// },
		// INVALID_ACC_ERROR:{
		// 	code: -32023,
		//   	message: /Unable to \w*lock the account/,
		//   	data: 'InvalidAccount'
		// },
		INVALID_METHOD:{
			code:-32601,
			message:"Method not found"
		},

		/*
		// Expect error code upate to 3

		GAS_LOW_ERROR:{
			code:-32010,
			message:/^Transaction gas is too low. There is not enough gas to cover minimal cost of/
		},
		NOT_ENOUGH_BALANCE_ERROR:{
			code:-32010,
			message:/^Insufficient funds. The account you tried to send transaction from does not have enough funds/
		},
		NONCE_CONFLICT_ERROR:{
			code:-32010,
			message:/Transaction gas price is too low. There is another transaction with same nonce in the queue/
		},
		INVALID_GAS_PRICE:{
			code: -32010,
  			message:/Transaction gas price is either too low or too high/
  		},
  		INVALID_GAS:{
  			code:-32010,
  			message:/Invalid transaction gas/
  		},
  		INVALID_CREATION_GAS:{
  			code:-32010,
  			message:/Invalid contract creation gas/
  		}
     */
		 EXECUTION_ERROR:`{
			 code:3
			 ...
		 }`


  		// PERSONAL_INVALID_PASSWORD:`{
  		// 	code: -32021,
  		// 	data: /InvalidPassword/
  		// 	...
  		// }`


};


module.exports = function(row, rt, resolution){
	let params = row.params;
	console.log(params);
	console.log("validateFormate: ",resolution.result,resolution.error)
	switch(params[0]){

		case 'error':
			expect(resolution.error).to.matchPattern(formats[params[1]]);
			break;
		case "errorCode":
			expect(resolution.error.code).to.equal(params[1]);
			break;
		case 'contains':
			expect(resolution.result).to.include(params[1]);
			break;
		case 'deployedCode':
			resolution.result = resolution.result.substring(2);
			params[1] = params[1].substring(params[1].length-resolution.result.length);
			//console.log(resolution.result.length + "\t"+params[1].length);
			expect(resolution.result).to.equal(params[1]);
			break;
		case 'equal':
			if(params[2]){
				let chain = params[2].split('.');
				let actualValue = resolution.result;
				chain.forEach((value,index)=>{
					if(!isNaN(value)){
						value = parseInt(value);
					}
					actualValue = actualValue[value];
				});
				if((typeof params[1] != typeof actualValue) && (typeof params[1] =='number' || typeof actualValue == 'number')){
					params[1]=parseInt(params[1]);
					actualValue = parseInt(actualValue);
				}
				expect(actualValue).to.equal(params[1]);
			}else{
				expect(resolution.result).to.equal(params[1]);
			}
			break;
		case "length":
			if(params[2]){
				expect(resolution.result).to.have.lengthOf(parseInt(params[2])-parseInt(params[1]));
			}else{
				expect(resolution.result).to.have.lengthOf(parseInt(params[1]));
			}
			break;
		case "contract":
			Object.values(resolution.result).forEach((value,index)=>{
				expect(value).to.matchPattern(formats.COMPILE_RESUILT);
			});
			break;
		case "atLeast":
			if(params[2]){
				expect(parseInt(resolution.result)).to.be.at.least(parseInt(params[2])-parseInt(params[1]));
			}else{
				expect(parseFloat(resolution.result)).to.be.at.least(parseFloat(params[1]));
			}
			break;
		default:
			expect(resolution.result).to.matchPattern(formats[params[1]]);

	}

	//rt.reassign(row.runtimeVal).storeVariables(row.storeVariables,resolution);
	return Promise.resolve(resolution);
}
