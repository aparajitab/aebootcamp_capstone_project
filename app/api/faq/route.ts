import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { getVectorizeContext } from "@/lib/vectorize";

const FAQ_SYSTEM_PROMPT = `You are a helpful FAQ assistant that answers questions using a knowledge base retrieved from Vectorize RAG.

When answering questions:
1. Use the provided context from the knowledge base to answer accurately
2. If relevant context is provided, base your answer on that information
3. Cite the source documents when using context
4. If no relevant context is found, acknowledge that and provide general helpful guidance
5. Be clear and practical in your answers

Always prioritize accuracy and provide actionable advice.`;

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || question.trim() === "") {
      return NextResponse.json({ response: "Please provide a question." }, { status: 400 });
    }

    console.log("FAQ API - Processing question:", question);

    // Query Vectorize for relevant context
    const vectorizeContext = await getVectorizeContext(question);
    console.log("FAQ API - Vectorize context received:", vectorizeContext ? "yes" : "no");

    // Build the prompt with Vectorize context
    let prompt = question;
    if (vectorizeContext) {
      prompt = `${vectorizeContext}\n\nUser Question: ${question}`;
    }

    console.log("FAQ API - Calling OpenAI with prompt");

    // Use OpenAI with Vectorize context
    const result = await generateText({
      model: openai("gpt-5"),
      system: FAQ_SYSTEM_PROMPT,
      prompt: prompt,
    });

    console.log("FAQ API - OpenAI response received");

    return NextResponse.json({
      response: result.text,
      sources: vectorizeContext ? ["Vectorize Knowledge Base"] : [],
    });
  } catch (error) {
    console.error("FAQ API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { response: `Error processing your request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
