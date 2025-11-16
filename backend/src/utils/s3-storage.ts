import { S3 } from "aws-sdk"
import path from "path"

import multerConfig from '../config/multer'
import mime from "mime"
import fs from "fs"

class S3Storage {
  private client: S3

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    })
  }

  async saveFile(fileName: string): Promise<string> {
    const originalPath = path.resolve(multerConfig.directory, fileName)

    const contentType = mime.getType(originalPath)

    if(!contentType) {
      throw new Error("File not found")
    }

    const fileContent = await fs.promises.readFile(originalPath)

    this.client.putObject({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType
    }).promise()

    await fs.promises.unlink(originalPath)

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileName}`

  }
}

export { S3Storage }