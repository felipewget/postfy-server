import OpenAI from 'openai';
import { AiProvider } from '../ai-provider.interface';

export class ChatGptProvider implements AiProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generatePosts(
    numOfPosts: number,
    persona: any,
    guidelines: string[] = [],
  ): Promise<string[]> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `Você é ${persona.profile_name}, um bot da indústria ${persona.industry}.
        Tom de voz: ${persona.tone_of_voice}.
        Público-alvo: ${persona.target_audience}.
        Instruções adicionais: ${persona.additional_instructions}.
        Guidelines: ${guidelines.join('\n')}
        `,
      },
      {
        role: 'user',
        content: `Crie ${numOfPosts} posts curtos para social media em ${persona.preferred_language}.
        Cada post deve ser separado por quebra de linha.`,
      },
    ];

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.8,
    });

    const text = response.choices[0].message?.content ?? '';

    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  async createEmbedding(input: string | string[]) {
    const response =   await this.client.embeddings.create({
      input: input,
      model: 'text-embedding-3-small',
    });

    return response.data.map(embeddings => embeddings.embedding);
  }
}
