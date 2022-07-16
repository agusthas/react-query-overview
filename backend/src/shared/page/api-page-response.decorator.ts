import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageInfo } from './page-info.dto';

export const ApiPageResponse = <TModel extends Type>(options: {
  model: TModel;
  description?: string;
}) => {
  const { model, description } = options;
  return applyDecorators(
    ApiExtraModels(PageInfo),
    ApiExtraModels(model),
    ApiOkResponse({
      description,
      schema: {
        properties: {
          results: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
          info: { $ref: getSchemaPath(PageInfo) },
        },
      },
    }),
  );
};
