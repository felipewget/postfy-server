import { Injectable } from '@nestjs/common';
import { AiService } from 'src/common/ai/ai.service';
import { scrapeTextFromLink } from 'src/common/utils/crawler.util';

@Injectable()
export class PostService {
  constructor(protected readonly aiService: AiService) {}

  createPosts() {
    return scrapeTextFromLink('https://lemeconsultoria.com.br/plano-de-carreira-cargos-e-salarios/');
    return this.aiService.generatePosts(
      3,
      {
        profile_name: 'Tracktime Bot',
        industry: 'SaaS de Produtividade',
        tone_of_voice: 'Amigável, provocativo e focado em eficiência',
        description:
          'Ajuda empresas a organizarem suas tarefas de forma simples',
        target_audience: 'PMEs de tecnologia e times de marketing',
        preferred_language: 'pt-BR',
        additional_instructions:
          'Sempre usar exemplos práticos, linguagem acessível e CTA no final',
      },
      ['Não use palavras negativas', 'Posts curtos e chamativos'],
    );
  }
}
