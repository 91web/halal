import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const user = await getAuthUser();

    const { ingredient } = await req.json();

    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient is required" },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: google("gemini-3-flash-preview"), // Switched to 'gemini-1.5-flash' which is more stable and widely available for structured outputs
      prompt: `Analyze the ingredient "${ingredient}" for Halal compliance. 
      Provide a structured response in JSON format with the following fields:
      - status: "Halal", "Haram", or "Mushbooh" (doubtful)
      - reason: A detailed explanation of why it has this status.
      - evidence: Cite specific Islamic jurisprudence (Fiqh) or food science standards (like GSO or JAKIM).
      - health_notes: Any relevant health or nutritional information.
      - confidence_score: A number from 0 to 1 indicating analysis certainty.`,
    });

    let analysis;
    try {
      const cleanJson = text.replace(/```json|```/g, "").trim();
      analysis = JSON.parse(cleanJson);
    } catch (e) {
      analysis = {
        status: "Mushbooh",
        reason:
          "Analysis completed but failed to structure data. Raw output: " +
          text.substring(0, 100),
        evidence: "General Islamic dietary principles.",
        health_notes: "N/A",
        confidence_score: 0.5,
      };
    }

    const client = await clientPromise;
    const db = client.db("halalcheck");
    await db.collection("history").insertOne({
      userId: user?.id || null,
      userEmail: user?.email || "guest",
      ingredient,
      analysis,
      timestamp: new Date(),
      isGuest: !user,
    });

    if (!user) {
      return NextResponse.json({
        ...analysis,
        limited: true,
        message: "Register for full analysis details and history tracking",
      });
    }

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("[v0] AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to process analysis" },
      { status: 500 }
    );
  }
}
