import * as z from "zod";
import { anthropic } from "@ai-sdk/anthropic"
import { generateObject } from "ai"
import { NextResponse } from 'next/server'

import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
    const { question } = await req.json();  
    const device = await prisma.device.findUnique({where: { assetTag: tag}})  
    const {object} = await generateObject({
        model: anthropic('claude-haiku-4-5'),
        prompt: question,
        system: "You extract search filters from questions about a school device inventory. Extract any device model, location, or year constraints mentioned — regardless of whether the question asks to list, count, or describe devices.",
        schema: schema
}); 
    const matches = filterDevices(devices, object)
    return NextResponse.json(matches)
}
const schema = z.object({
    location: z.string().nullable(),
    model: z.string().nullable(),
    yearMin: z.number().nullable(),
    yearMax: z.number().nullable()
})
type Filters = {
  location: string | null;
  model: string | null;
  yearMin: number | null;
  yearMax: number | null;
};
function filterDevices(devices: Device[], filters: Filters) {
  return devices.filter((d) => {
    const modelOk    = filters.model === null || d.model.toLowerCase().includes(filters.model.toLowerCase());
    const locationOk = filters.location === null || d.location.toLowerCase().includes(filters.location.toLowerCase());
    const yearMinOk  = filters.yearMin === null || d.purchaseYear >= filters.yearMin;
    const yearMaxOk  = filters.yearMax === null || d.purchaseYear <= filters.yearMax;

    return modelOk && locationOk && yearMinOk && yearMaxOk;
  });
}