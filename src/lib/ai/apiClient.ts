const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY;

/**
 * Interface para configuração da chamada da API
 */
export interface ApiCallConfig {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Interface para resposta da API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Faz chamada para a API DeepSeek
 */
export async function callDeepSeekApi<T = any>(
  config: ApiCallConfig
): Promise<ApiResponse<T>> {
  if (!API_KEY) {
    return {
      success: false,
      error:
        "DEEPSEEK_API_KEY não configurada. Configure a variável de ambiente DEEPSEEK_API_KEY no arquivo .env.local",
    };
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: config.prompt }],
        temperature: config.temperature ?? 0.7,
        max_tokens: config.maxTokens ?? 2000,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `API request failed: ${response.status}`,
      };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return {
        success: false,
        error: "No content in API response",
      };
    }

    // Tentar parsear JSON da resposta
    try {
      const parsedData = parseApiResponse<T>(content);
      return {
        success: true,
        data: parsedData,
      };
    } catch (parseError) {
      console.error("Raw API response:", content);
      return {
        success: false,
        error: `Failed to parse API response as JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
      };
    }
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    return {
      success: false,
      error: `Erro na API DeepSeek: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Faz o parsing da resposta da API, limpando markdown e extraindo JSON
 */
export function parseApiResponse<T>(content: string): T {
  // Limpar markdown code blocks se presentes
  let cleanContent = content.trim();

  // Remover ```json e ``` se presentes
  if (cleanContent.startsWith("```json")) {
    cleanContent = cleanContent.replace(/^```json\s*/, "");
  }
  if (cleanContent.endsWith("```")) {
    cleanContent = cleanContent.replace(/\s*```$/, "");
  }

  // Tentar encontrar JSON válido se houver texto extra
  const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleanContent = jsonMatch[0];
  }

  return JSON.parse(cleanContent);
}
