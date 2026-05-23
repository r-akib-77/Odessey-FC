import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "edge";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const { id } = await params;

    // 1. Get the image URL from the database first
    const article = await db.prepare("SELECT image FROM news WHERE id = ?").bind(id).first();
    
    if (article && article.image) {
      const imageUrl = article.image;
      
      // 2. Initialize S3 client to delete from R2
      const endpoint = process.env.R2_S3_ENDPOINT;
      const accessKeyId = process.env.R2_ACCESS_KEY_ID;
      const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
      const bucketName = process.env.R2_BUCKET_NAME;

      if (endpoint && accessKeyId && secretAccessKey && bucketName) {
        try {
          // Extract the filename (key) from the URL
          const urlParts = imageUrl.split('/');
          const key = urlParts[urlParts.length - 1];

          if (key) {
            const s3Client = new S3Client({
              region: "auto",
              endpoint: endpoint,
              credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
              },
            });

            await s3Client.send(
              new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key,
              })
            );
            console.log(`Deleted image ${key} from R2`);
          }
        } catch (s3Error) {
          console.error("Failed to delete image from R2:", s3Error);
          // We continue to delete from DB even if S3 fails to avoid orphaned DB records
        }
      }
    }

    // 3. Delete the record from the database
    await db.prepare("DELETE FROM news WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
