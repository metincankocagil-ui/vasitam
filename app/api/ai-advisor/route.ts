import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Sen Vasıtan.com’un AI araç danışmanısın.
Kullanıcının bütçe, kullanım amacı, aile durumu, şehir içi/uzun yol kullanımı, yakıt tercihi, bakım maliyeti ve ikinci el değeri gibi kriterlerine göre araç önerirsin.
Cevapların Türkçe, kısa, net ve kullanıcı dostu olmalı.
Kesin hüküm verme; kullanıcıya ekspertiz, tramer ve servis geçmişini kontrol etmesini hatırlat.
Cevap formatı:
1. En uygun 3 araç
2. Neden uygun?
3. Dikkat edilmesi gerekenler
4. Alternatif öneriler`;

function extractText(data: unknown): string {
  if (
    data &&
    typeof data === "object" &&
    "output_text" in data &&
    typeof data.output_text === "string"
  ) {
    return data.output_text;
  }

  if (!data || typeof data !== "object" || !("output" in data) || !Array.isArray(data.output)) {
    return "";
  }

  return data.output
    .flatMap((item: unknown) => {
      if (!item || typeof item !== "object" || !("content" in item) || !Array.isArray(item.content)) {
        return [];
      }

      return item.content
        .map((contentItem: unknown) => {
          if (
            contentItem &&
            typeof contentItem === "object" &&
            "text" in contentItem &&
            typeof contentItem.text === "string"
          ) {
            return contentItem.text;
          }

          return "";
        })
        .filter(Boolean);
    })
    .join("\n")
    .trim();
}

function extractOpenAIError(data: unknown): { code?: string; message?: string; type?: string } {
  if (!data || typeof data !== "object" || !("error" in data)) {
    return {};
  }

  const error = data.error;

  if (!error || typeof error !== "object") {
    return {};
  }

  return {
    code: "code" in error && typeof error.code === "string" ? error.code : undefined,
    message: "message" in error && typeof error.message === "string" ? error.message : undefined,
    type: "type" in error && typeof error.type === "string" ? error.type : undefined,
  };
}

function userFacingOpenAIError(status: number, data: unknown): string {
  const error = extractOpenAIError(data);

  if (status === 401) {
    return "OpenAI API anahtarı geçersiz görünüyor.";
  }

  if (status === 429 && (error.code === "insufficient_quota" || error.type === "insufficient_quota")) {
    return "OpenAI kota veya ödeme limiti yetersiz. Lütfen hesabı kontrol et.";
  }

  if (status === 429) {
    return "OpenAI yoğunluk limiti aşıldı. Biraz sonra tekrar dene.";
  }

  return "AI cevabı alınamadı. Lütfen tekrar dene.";
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "buraya_api_key_yaz") {
      return NextResponse.json(
        { error: "AI danışman için API anahtarı yapılandırılmamış." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ error: "Lütfen araç ihtiyacını yaz." }, { status: 400 });
    }

    if (message.length > 1200) {
      return NextResponse.json({ error: "Mesaj çok uzun. Lütfen daha kısa yaz." }, { status: 400 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: SYSTEM_PROMPT }],
          },
          {
            role: "user",
            content: [{ type: "input_text", text: message }],
          },
        ],
        max_output_tokens: 650,
      }),
    });

    const data = (await response.json()) as unknown;

    if (!response.ok) {
      return NextResponse.json(
        { error: userFacingOpenAIError(response.status, data) },
        { status: response.status },
      );
    }

    const answer = extractText(data);

    if (!answer) {
      return NextResponse.json(
        { error: "AI cevabı boş geldi. Lütfen tekrar dene." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { error: "AI danışman şu an yanıt veremiyor. Lütfen tekrar dene." },
      { status: 500 },
    );
  }
}
