import axios from "axios";
import FormData from "form-data";
import { createReadStream } from "fs";

const configPath = "./scripts/metadata.json";
function genConfig(path: string) {
  var data = new FormData();
  data.append("file", createReadStream(path));

  return {
    method: "post",
    url: "https://api.nft.storage/upload",
    headers: {
      Authorization: `Bearer ${process.env.storage_token}`,
      ...data.getHeaders(),
    },
    data: data,
  };
}

async function main() {
  genConfig(configPath);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
