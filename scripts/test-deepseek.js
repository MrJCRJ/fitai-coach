import { config } from "dotenv";

// Carregar variáveis de ambiente
config({ path: "./.env.local" });

async function testDeepSeekAPI() {
  const API_KEY = process.env.DEEPSEEK_API_KEY;

  if (!API_KEY) {
    console.log("❌ DEEPSEEK_API_KEY não encontrada no .env.local");
    console.log("📝 Adicione sua chave da API DeepSeek no arquivo .env.local");
    return;
  }

  console.log("🔑 API Key encontrada, testando conexão...");

  try {
    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "user", content: "Olá, você é uma IA de fitness?" },
          ],
          max_tokens: 100,
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log("✅ API DeepSeek funcionando!");
      console.log("🤖 Resposta:", data.choices[0]?.message?.content);
    } else {
      console.log("❌ Erro na API:", response.status, response.statusText);
    }
  } catch (error) {
    console.log("❌ Erro de conexão:", error.message);
  }
}

testDeepSeekAPI();
