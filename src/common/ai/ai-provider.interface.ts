export interface AiProvider {
  generatePosts(numOfPosts: number, persona: Record<string, any>, guidelines?: string[]): Promise<string[]>;
  
  createEmbedding(input: string | string[]): Promise<any>; // @TODO
}