# Web3 Ticken

## How to run

### 1. File Related

Add your NFT.Storage API Key in .env like

`storage_token = <API-KEY>`

### 2. Upload File

Change filepath in `./scripts/upload_file.ts`, and run it with `npx hardhat run ./scripts/upload_file.ts`.

CID will show on stdout.

## Reference

Doc: https://uqmdrqi3zu.feishu.cn/docx/Oe5wd4ZC9omaDMxZyRicNQjqn8b

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
