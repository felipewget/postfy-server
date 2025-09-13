import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

type DocumentationParams = {
  title: string;
  success: {
    code: number;
    description?: string;
  };
  params?: {
    name: string;
    required: boolean;
    description: string;
  }[];
  authRequired?: boolean;
};

export function Documentation(params: DocumentationParams): MethodDecorator & ClassDecorator {
  const decorators: (MethodDecorator | ClassDecorator)[] = [];

  // Summary (title)
  decorators.push(ApiOperation({ summary: params.title }));

  // Success response
  decorators.push(
    ApiResponse({
      status: params.success.code,
      description: params.success.description ?? '',
    }),
  );

  // Params (if any)
  if (params.params) {
    for (const p of params.params) {
      decorators.push(
        ApiParam({
          name: p.name,
          required: p.required,
          description: p.description,
          type: String,
        }),
      );
    }
  }

  // Auth-related responses
  if (params?.authRequired) {
    decorators.push(
      ApiResponse({
        status: 401,
        description: 'Unauthorized - invalid or missing token',
      }),
    );
    decorators.push(
      ApiResponse({
        status: 403,
        description: 'Forbidden - insufficient permissions',
      }),
    );
  }

  return applyDecorators(...decorators);
}
