import { action } from "./_generated/server";
// @ts-ignore
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    // do something with `args.a` and `args.b`

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams["voice"],
      input,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // optionally return a value
    return buffer;
  },
});
