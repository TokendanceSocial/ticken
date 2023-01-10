import { NFTStorage, File, Blob } from "nft.storage";

export const client = new NFTStorage({
  token: process.env.storage_token as string,
});
