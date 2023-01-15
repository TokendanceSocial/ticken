import axios from "axios";
import FormData from "form-data";
import { readFileSync } from "fs";
import { UploadResponse } from "./model";

const configPath = "./materials/metadata.json";
const uploadContent = async (
  content: string | Buffer,
  filename: string
): Promise<UploadResponse> => {
  var data = new FormData();
  const contentType = filename.endsWith("json")
    ? "application/json"
    : "image/png";
  data.append("file", content, {
    filename: filename,
    contentType: contentType,
  });

  const resp = await axios<UploadResponse>({
    method: "post",
    url: "https://api.nft.storage/upload",
    headers: {
      Authorization: `Bearer ${process.env.storage_token}`,
      ...data.getHeaders(),
    },
    data: data,
  });
  return resp.data;
};

async function main() {
  const file = readFileSync(configPath);
  const metadata: any = JSON.parse(file.toString());
  const imageAddr: string = metadata.image;
  if (!imageAddr.startsWith("ipfs")) {
    // console.log("Should Upload Image first");
    const imageFile = readFileSync(imageAddr);
    // TODO: 这里改成读取文件名
    const response = await uploadContent(imageFile, "ticket.png");
    if (!response.ok) {
      console.error(`Upload Error:${response}`);
    }
    const iInfo = response.value;
    metadata.image = `ipfs://${iInfo.cid}`;
    // console.log(`Upload img success:${iInfo.cid}`);
  }

  const response = await uploadContent(
    JSON.stringify(metadata),
    "metadata.json"
  );
  if (!response.ok) {
    console.error(`Upload Error:${response}`);
  }
  const fInfo = response.value;
  console.log(`Upload Success:${fInfo.cid}`);
  console.log(
    `QuickView URL:https://${fInfo.cid}.ipfs.nftstorage.link/metadata.json`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
