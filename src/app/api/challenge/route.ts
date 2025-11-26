import { NextRequest, NextResponse } from "next/server";
import { generatePersonalizedChallenge } from "@/lib/ai/deepseek";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil do usuário é obrigatório" },
        { status: 400 },
      );
    }

    const challenge = await generatePersonalizedChallenge(profile);

    return NextResponse.json({ challenge });
  } catch (error) {
    console.error("Erro ao gerar desafio personalizado:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
