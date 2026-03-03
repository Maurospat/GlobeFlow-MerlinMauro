'use server';
/**
 * @fileOverview This file provides an AI-powered document guidance system.
 *
 * - aiDocumentGuidance - A function that generates specific instructions on how to obtain a required document.
 * - AiDocumentGuidanceInput - The input type for the aiDocumentGuidance function.
 * - AiDocumentGuidanceOutput - The return type for the aiDocumentGuidance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiDocumentGuidanceInputSchema = z.object({
  documentTitle: z.string().describe('The title of the document for which instructions are needed (e.g., Passport copy, Tax residency certificate).'),
  homeCountry: z.string().optional().describe('The user\'s home country, if known, to provide more localized advice.'),
});
export type AiDocumentGuidanceInput = z.infer<typeof AiDocumentGuidanceInputSchema>;

const AiDocumentGuidanceOutputSchema = z.object({
  instructions: z.string().describe('Detailed, actionable instructions on how and where to obtain the specified document.'),
});
export type AiDocumentGuidanceOutput = z.infer<typeof AiDocumentGuidanceOutputSchema>;

export async function aiDocumentGuidance(input: AiDocumentGuidanceInput): Promise<AiDocumentGuidanceOutput> {
  return aiDocumentGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDocumentGuidancePrompt',
  input: { schema: AiDocumentGuidanceInputSchema },
  output: { schema: AiDocumentGuidanceOutputSchema },
  prompt: `You are an expert immigration consultant specializing in financial immigration to Indonesia for high-net-worth individuals. Your task is to provide clear, specific, and actionable instructions on how to obtain a particular document.

Context:
- The user is a high-net-worth individual immigrating to Indonesia.
{{#if homeCountry}} - The user's home country is: {{{homeCountry}}}. Tailor your advice to this context if possible.
{{/if}}

Provide step-by-step guidance on 'how' and 'where' to obtain the following document:

Document Title: {{{documentTitle}}}

Ensure the instructions are comprehensive, easy to understand, and cover potential channels for acquisition (e.g., government offices, online portals, specific institutions, necessary prerequisites).`,
});

const aiDocumentGuidanceFlow = ai.defineFlow(
  {
    name: 'aiDocumentGuidanceFlow',
    inputSchema: AiDocumentGuidanceInputSchema,
    outputSchema: AiDocumentGuidanceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
