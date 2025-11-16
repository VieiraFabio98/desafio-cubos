import { S3Storage } from "@utils/s3-storage"
import { injectable } from "tsyringe"

@injectable()
class UploadImageService {
  async execute(file: Express.Multer.File): Promise<string> {
    const s3Storage = new S3Storage()
    const fileName = await s3Storage.saveFile(file.filename)
    return fileName
  }
}

export { UploadImageService }