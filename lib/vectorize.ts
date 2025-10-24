/**
 * Vectorize RAG Integration
 *
 * This module provides utilities to interact with Vectorize API
 * for retrieval-augmented generation (RAG) functionality.
 */

interface VectorizeResult {
  id: string;
  text: string;
  score: number;
  metadata?: Record<string, any>;
}

interface VectorizeResponse {
  results: VectorizeResult[];
  total: number;
}

/**
 * Query Vectorize API to retrieve relevant documents
 * @param query - The search query
 * @param topK - Number of top results to return (default: 5)
 * @returns Array of relevant documents with scores
 */
export async function queryVectorize(
  query: string,
  topK: number = 5
): Promise<VectorizeResult[]> {
  try {
    const accessToken = process.env.VECTORIZE_ACCESS_TOKEN;
    const endpoint = process.env.VECTORIZE_ENDPOINT;

    if (!accessToken || !endpoint) {
      console.error("Vectorize environment variables not configured");
      return [];
    }

    const requestBody = {
      question: query,
      numResults: topK,
    };

    console.log("Vectorize request:", { endpoint, body: requestBody });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Vectorize response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Vectorize API error: ${response.status} ${response.statusText}`, errorText);
      return [];
    }

    const data = await response.json();
    console.log("Vectorize response data:", data);

    // Handle different possible response formats
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    } else if (data.documents && Array.isArray(data.documents)) {
      // Convert documents format to results format
      return data.documents.map((doc: any, index: number) => ({
        id: doc.id || `doc-${index}`,
        text: doc.text || doc.content || "",
        score: doc.score || doc.relevancy || 0,
        metadata: doc.metadata,
      }));
    } else if (Array.isArray(data)) {
      // If response is directly an array
      return data.map((item: any, index: number) => ({
        id: item.id || `doc-${index}`,
        text: item.text || item.content || "",
        score: item.score || item.relevancy || 0,
        metadata: item.metadata,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error querying Vectorize:", error);
    return [];
  }
}

/**
 * Format Vectorize results into context for LLM
 * @param results - Array of Vectorize results
 * @returns Formatted context string
 */
export function formatVectorizeResults(results: VectorizeResult[]): string {
  if (!results || results.length === 0) {
    return "";
  }

  return results
    .map(
      (result, index) =>
        `[${index + 1}] (Score: ${(result.score * 100).toFixed(1)}%) ${result.text}`
    )
    .join("\n\n");
}

/**
 * Get context from Vectorize for a query
 * @param query - The user's question
 * @returns Context string to be used with LLM
 */
export async function getVectorizeContext(query: string): Promise<string> {
  const results = await queryVectorize(query, 5);

  if (results.length === 0) {
    return "";
  }

  return `Based on the knowledge base:\n\n${formatVectorizeResults(results)}`;
}
