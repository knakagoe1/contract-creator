/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() {
    var web3 = new Web3();
    var storage = localStorage;

    // ソースコード
    var code = new Vue({
        el: '#code',
        data: {
            code: storage.getItem("code") ? storage.getItem("code") : ""
        }
    })

    // ノードURL
    var nodeUrl = new Vue({
        el: '#nodeUrl',
        data: {
            nodeUrl: storage.getItem("nodeUrl") ? storage.getItem("nodeUrl") : ""
        }
    })

    // コントラクト名
    var contractName = new Vue({
        el: '#contractName',
        data: {
            contractName: storage.getItem("contractName") ? storage.getItem("contractName") : ""
        }
    })

    // メッセージ
    var message = new Vue({
        el: '#message',
        data: {
            message: ""
        }
    })

    // コントラクトアドレス
    var contractAddress = new Vue({
        el: '#contractAddress',
        data: {
            contractAddress: storage.getItem("contractAddress") ? storage.getItem("contractAddress") : ""
        }
    })

    // トランザクションハッシュ
    var txHash = new Vue({
        el: '#txHash',
        data: {
            txHash: storage.getItem("txHash") ? storage.getItem("txHash") : ""
        }
    })

    // トランザクションハッシュ
    var log = new Vue({
        el: '#log',
        data: {
            log: ""
        }
    })

    // コントラクト登録
    var create = new Vue({
        el: '#create',
        methods: {
            create: function() {

                web3.setProvider(new web3.providers.HttpProvider(nodeUrl.$data.nodeUrl));
                var source = code.$data.code;
                try {
                    var sourceCompiled = web3.eth.compile.solidity(source);
                } catch (e) {
                    log.$data.log = e.message;
                    console.log(e);
                    message.$data.message = 'OMG!';
                    throw new Error;
                }
                message.$data.message = 'mining..';
                var contractABI = web3.eth.contract(sourceCompiled["<stdin>:" + contractName.$data.contractName].info.abiDefinition);
                var contractCreation = contractABI.new({
                    from: web3.eth.accounts[0], // 0番目のアカウントに固定
                    data: sourceCompiled["<stdin>:" + contractName.$data.contractName].code,
                    gas: '4700000' // 大きめのgasを設定
                }, function(e, contract) {
                    if (typeof contract.address !== 'undefined') {
                        message.$data.message = 'YEAH!';
                        txHash.$data.txHash = contract.transactionHash;
                        contractAddress.$data.contractAddress = contract.address;

                        // localstorageへの保存 
                        storage.setItem("txHash", txHash.$data.txHash);
                        storage.setItem("contractAddress", contractAddress.$data.contractAddress);
                    }
                    if (e) {
                        log.$data.log = e.message;
                        console.log(e);
                        message.$data.message = 'OMG!';
                    }
                });

                // localstorageへの保存
                storage.setItem("code", code.$data.code);
                storage.setItem("contractName", contractName.$data.contractName);
                storage.setItem("nodeUrl", nodeUrl.$data.nodeUrl);
            }
        },
    })
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
(function webpackMissingModule() { throw new Error("Cannot find module \"serve\""); }());


/***/ })
/******/ ]);