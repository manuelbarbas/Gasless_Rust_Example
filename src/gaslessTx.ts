import { ethers } from "ethers";
import { mineGasForTransaction } from "@eidolon-labs/gasless";
import {chains} from "./config/chains";

/**
 * 
 * @param chainName: should be "calypso" | "europa" | "nebula" | "titan"
 * @param chainType: should be "mainnet" | "testnet" 
 * @param receiver: receiver of the sFUEL to be distributed 
 */
async function DistributeGas(chainName: string, chainType: "mainnet" | "testnet" ,receiver: string) {
  
  const rpc = chains[chainName as keyof typeof chains].chainInfo[chainType].rpcUrl;
  const Gas_Distribution_Contract = chains[chainName as keyof typeof chains].chainInfo[chainType].proofOfWork;

  const provider = new ethers.JsonRpcProvider(rpc);
  const randomWallet = ethers.Wallet.createRandom(provider);

  const nonce = await randomWallet.getNonce();
  const { gasPrice } = await mineGasForTransaction(10000000, randomWallet.address, nonce);

  const functionSignature = chainName === "europa" && chainType === "mainnet" ? "0x6a627842" : "0x0c11dedd";

  const tx = await randomWallet.sendTransaction({
    to: Gas_Distribution_Contract,
    data: functionSignature + "000000000000000000000000" + receiver.substring(2),
    value: 0,
    gasLimit: 10000000,
    gasPrice: gasPrice
  });

  console.log(tx);

}

DistributeGas("nebula","testnet","some_wallet_to_receive_sFUEL");
