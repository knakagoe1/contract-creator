# contract-creator

## Usage

```
git clone https://github.com/knakagoe1/contract-creator
```
1. Unzip "contract-creator.zip" file.
2. Open index.html
3. Input "Node URL" like http://127.0.0.1:8545
4. Input "Contract Name"
5. Click "create" button
6. Wait until transaction has completed
7. After transaction has completed, you can get the contract address

> If you want to execute your contract on go-ethereum JavaScript console, copy the log displayed and paste to go-ehtereum JavaScript console.

### Note
- contract owner : web3.eth.accounts[0]
- gas : 4700000

## Development
```
cd contract-creator
npm install
bower install
npm run serve --inline
```
and open http://127.0.0.1:8080

