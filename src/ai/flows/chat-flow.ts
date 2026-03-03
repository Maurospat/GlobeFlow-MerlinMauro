'use server';
/**
 * @fileOverview Ein KI-Chat-Flow für den Fallmanager.
 *
 * - chatWithManager - Eine Funktion, die mit dem KI-Berater chattet.
 * - ChatInput - Der Eingabetyp für die Funktion.
 * - ChatOutput - Der Rückgabetyp für die Funktion.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string(),
  language: z.enum(['en', 'de']),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  text: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chatWithManager(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const genkitMessages = input.history.map(m => ({
      role: m.role,
      content: [{ text: m.text }]
    }));

    const response = await ai.generate({
      system: `You are Sarah Hamilton, a senior relocation manager at GlobeFlow. 
      You specialize in helping high-net-worth individuals move to Indonesia via the Golden Visa or financial immigration routes.
      Your tone is professional, exclusive, reassuring, and highly competent.
      You provide concise but thorough advice on document requirements, asset transfers, and life in Indonesia (Bali/Jakarta).
      IMPORTANT: Respond ONLY in ${input.language === 'de' ? 'German (Deutsch)' : 'English'}.
      Address the user as Alexander.`,
      messages: [
        ...genkitMessages,
        { role: 'user', content: [{ text: input.message }] }
      ],
    });

    return { text: response.text };
  }
);
