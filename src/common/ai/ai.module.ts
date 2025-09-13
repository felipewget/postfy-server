import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AiService } from "./ai.service";
import { ChatGptProvider } from "./providers/chatgpt.provider";
import { AiProvider } from "./ai-provider.interface";

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: "AI_PROVIDER",
      useFactory: (config: ConfigService): AiProvider => {
        return new ChatGptProvider(config.get<string>("OPENAI_API_KEY") ?? '');
      },
      inject: [ConfigService],
    },
    AiService,
  ],
  exports: [AiService],
})
export class AiModule {}