import {
  PutObjectCommand,
  DeleteObjectCommand,
  paginateListObjectsV2,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

import {
  params,
  s3Client,
  rawImagesBucket,
  processedImageBucket,
  getObjectURL,
} from "../config/aws.js";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

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
    // Extract uploaded file information
    const fileName = req.file.originalname;
    const file = req.file.buffer;
    console.log(fileName);

    const params = {
      Bucket: rawImagesBucket,
      Key: `${randomImageName()} - ${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    console.log(file, fileName);
    res.status(201).json("image uploaded successfully...");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    const params = {
      Bucket: processedImageBucket,
      Key: id,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    res.status(200).json({ msg: "image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "failed to delete image" });
  }
};

export { getImages, uploadImages, deleteImage };
