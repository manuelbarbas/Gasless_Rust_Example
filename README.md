## Gasless SKALE Transaction 

This repo showcases how to use SKALE Gasless Transaction using the lib `@eidolon-labs/gasless`.
This library it's written in Rust which makes the gas price minning process 3x - 5x quicker than before

### Steps

1. **Install Packages**

```sh
npm install
```

2. **Setup Gasless Distribution Function**

Set a receiver when calling `DistributeGas` as well as the desired chain and testnet/mainnet

3. **Run Distribution Test**

```sh
npx ts-node src/gaslessTx.ts
```
