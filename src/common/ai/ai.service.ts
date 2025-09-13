import { Injectable } from '@nestjs/common';
import { ChatGptProvider } from './providers/chatgpt.provider';
import { AiProvider } from './ai-provider.interface';
import { chunkText } from './ai.utils';

@Injectable()
export class AiService {
  private provider: AiProvider;

  constructor() {
    this.provider = new ChatGptProvider(process.env.OPENAI_API_KEY!);
  }

  async generatePosts(
    numOfPosts: number,
    persona: any,
    guidelines: string[] = [],
  ) {
    return this.provider.generatePosts(numOfPosts, persona, guidelines);
  }

  async createEmbedding(input: string | string[]) {
    if(typeof input === 'string' ){
      input = chunkText(input);
    }

    return this.provider.createEmbedding(input);
  }
}
