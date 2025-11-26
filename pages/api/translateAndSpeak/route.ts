import { NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";
import { v2 as Translate } from "@google-cloud/translate";

const ttsClient = new textToSpeech.TextToSpeechClient();
const translateClient = new Translate.Translate();

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();

    // 1. Translate text
    const [translation] = await translateClient.translate(text, targetLang);

    // 2. Generate voice
    const [response] = await ttsClient.synthesizeSpeech({
      input: { text: translation },
      voice: { languageCode: targetLang, ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    });

    return new NextResponse(
      JSON.stringify({
        translatedText: translation,
        audioContent: response.audioContent?.toString("base64"),
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Translation/Voice error:", error);
    return NextResponse.json(
      { error: "Failed to translate or speak" },
      { status: 500 },
    );
  }
}
