import { client } from "../base/ipfs_client";
import axios from "axios";

var config = {
  method: "get",
  url: "https://bafkreiba24ke767pgmvxs7gx2knsvgqrev477ywknya6d2esqidkhn4sw4.ipfs.nftstorage.link",
  headers: {},
};

async function main() {
  const cid = "bafkreiba24ke767pgmvxs7gx2knsvgqrev477ywknya6d2esqidkhn4sw4";
  console.log(await client.check(cid));
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
