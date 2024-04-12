import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const rawImagesBucket = "raw-images-vividarts-cy";
const processedImageBucket = "processed-images-vividarts-cy";

const params = {
  Bucket: processedImageBucket,
};

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: processedImageBucket,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

export {
  params,
  s3Client,
  rawImagesBucket,
  processedImageBucket,
  getObjectURL,
};
