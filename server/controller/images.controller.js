import {
  PutObjectCommand,
  DeleteObjectCommand,
  paginateListObjectsV2,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  params,
  s3Client,
  rawImagesBucket,
  processedImageBucket,
  getObjectURL,
} from "../config/aws.js";

const data = [];
const getImages = async (req, res) => {
  try {
    const response = await s3Client.send(new ListObjectsV2Command(params));

    response.Contents.forEach(async (file) => {
      const Key = file.Key;
      const signedUrl = await getObjectURL(Key);

      // don't populate data array after initial push
      if (data.length < response.KeyCount) {
        data.push({ Key, signedUrl });
        return;
      }
    });
    const length = data.length;
    return res.status(200).json({ length, data });
  } catch (err) {
    res.status(500).json({ msg: "something went wrong", err });
  }
};

const uploadImages = async (req, res) => {
  try {
  } catch (error) {}
};

export { getImages };
