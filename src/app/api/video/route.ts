import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const Videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (Videos.length === 0 || !Videos) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(Videos, { status: 200 });
  } catch (error) {
    console.error("Fetch video error: ", error);
    return NextResponse.json(
      { error: "failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    connectToDatabase();

    const body: IVideo = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        height: Number,
        width: Number,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);

    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new video" },
      { status: 500 }
    );
  }
}
