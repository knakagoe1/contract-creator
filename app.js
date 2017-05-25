(function() {
    var web3 = new Web3();
    var storage = localStorage;

    // solidity code
    var code = new Vue({
        el: '#code',
        data: {
            code: storage.getItem("code") ? storage.getItem("code") : ""
        }
    })

    // node URL
    var nodeUrl = new Vue({
        el: '#nodeUrl',
        data: {
            nodeUrl: storage.getItem("nodeUrl") ? storage.getItem("nodeUrl") : ""
        }
    })

    // contract name
    var contractName = new Vue({
        el: '#contractName',
        data: {
            contractName: storage.getItem("contractName") ? storage.getItem("contractName") : ""
        }
    })

    // contract address
    var contractAddress = new Vue({
        el: '#contractAddress',
        data: {
            contractAddress: storage.getItem("contractAddress") ? storage.getItem("contractAddress") : ""
        }
    })

    // transaction hash
    var txHash = new Vue({
        el: '#txHash',
        data: {
            txHash: storage.getItem("txHash") ? storage.getItem("txHash") : ""
        }
    })

    // log
    var log = new Vue({
        el: '#log',
        data: {
            log: ""
        }
    })

    // animation class
    var animation = new Vue({
        el: '#animation',
        data: {
            mining: false,
            success: false,
            error: false
        }
    })

    // create contarct
    var create = new Vue({
        el: '#create',
        methods: {
            create: function() {
                txHash.$data.txHash = "";
                contractAddress.$data.contractAddress = "";
                log.$data.log = "";
                animation.$data.success = false;
                animation.$data.error = false;
                animation.$data.mining = false;
                try {
                    web3.setProvider(new web3.providers.HttpProvider(nodeUrl.$data.nodeUrl));
                    var source = code.$data.code;
                    var sourceCompiled = web3.eth.compile.solidity(source);
                    var contractABI = web3.eth.contract(sourceCompiled["<stdin>:" + contractName.$data.contractName].info.abiDefinition);
                    var contractCreation = contractABI.new({
                        from: web3.eth.accounts[0], // 0th acccount of node is the contract owner
                        data: sourceCompiled["<stdin>:" + contractName.$data.contractName].code,
                        gas: '4700000' // enough gas amount to deploy
                    }, function(e, contract) {
                        animation.$data.mining = true;
                        if (typeof contract.address !== 'undefined') {
                            animation.$data.mining = false;
                            animation.$data.success = true;
                            txHash.$data.txHash = contract.transactionHash;
                            contractAddress.$data.contractAddress = contract.address;
                            document.getElementById("log").style.color = "black";
                            log.$data.log = "var contract = web3.eth.contract(" + JSON.stringify(contract.abi) + ").at('" + contract.address + "')";

                            // save to localstorage of browser 
                            storage.setItem("txHash", txHash.$data.txHash);
                            storage.setItem("contractAddress", contractAddress.$data.contractAddress);
                        }
                        if (e) {
                            document.getElementById("log").style.color = "red";
                            log.$data.log = e.message;
                            console.log(e);
                            animation.$data.mining = false;
                            animation.$data.error = true;
                        }
                    });

                    // localstorageへの保存
                    storage.setItem("code", code.$data.code);
                    storage.setItem("contractName", contractName.$data.contractName);
                    storage.setItem("nodeUrl", nodeUrl.$data.nodeUrl);

                } catch (e) {
                    document.getElementById("log").style.color = "red";
                    log.$data.log = e.message;
                    console.log(e);
                    animation.$data.mining = false;
                    animation.$data.error = true;
                    throw new Error;
                }
            }
        },
    })
})();