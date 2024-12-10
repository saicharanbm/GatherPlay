import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.BUCKET_NAME
) {
  throw new Error("AWS credentials not found");
}

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export const getSecureUrl = async (fileName: string, ContentType: string) => {
  const params = {
    Bucket: `${process.env.BUCKET_NAME}/channel`,
    Key: fileName,
    ContentType,
  };

  const command = new PutObjectCommand(params); // `PutObjectCommand` comes from `@aws-sdk/client-s3`
  const uploadURL = await getSignedUrl(s3, command, { expiresIn: 300 }); // expiresIn in seconds
  return uploadURL;
};
