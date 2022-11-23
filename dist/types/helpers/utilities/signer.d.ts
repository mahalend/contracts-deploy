import { Signer } from "ethers";
import { tEthereumAddress } from "../types";
export declare const getEthersSigners: () => Promise<Signer[]>;
export declare const getEthersSignersAddresses: () => Promise<tEthereumAddress[]>;
export declare const getFirstSigner: () => Promise<Signer>;
