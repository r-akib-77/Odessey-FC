import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Use edge runtime for Cloudflare compatibility
export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const endpoint = process.env.R2_S3_ENDPOINT;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicUrlBase = process.env.R2_PUBLIC_URL;

    // Check for required environment variables
    if (!endpoint || !accessKeyId || !secretAccessKey || !bucketName) {
      console.error("Missing R2 S3 credentials in environment variables");
      return NextResponse.json({ error: "Storage configuration incomplete" }, { status: 500 });
    }

    const s3Client = new S3Client({
      region: "auto",
      endpoint: endpoint,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const fileBuffer = await file.arrayBuffer();

    // Upload to R2 via S3 API
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: new Uint8Array(fileBuffer),
        ContentType: file.type || "application/octet-stream",
      })
    );

    // Construct public URL
    const url = publicUrlBase 
      ? `${publicUrlBase.replace(/\/$/, "")}/${filename}`
      : `https://${bucketName}.${endpoint.split('://')[1]}/${filename}`;

    return NextResponse.json({
      success: true,
      url,
      filename
    });
  } catch (error: any) {
    console.error("Error in cross-account R2 upload:", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}
