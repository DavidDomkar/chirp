import { H3Event } from 'h3';
import { TypeSystem } from '@sinclair/typebox/system';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Static, TSchema } from '@sinclair/typebox';

// Custom format for trimming strings
TypeSystem.Format('trimmed', (value) => value === value.trim());

// Helper function for body validation
export const validateBody = async <T extends TSchema>(event: H3Event, schema: T): Promise<Static<T, []>> => {
  const body = await readBody(event);
  const errors = [...TypeCompiler.Compile(schema).Errors(body)];
  if (errors.length !== 0) {
    throw createError({ statusCode: 400, statusMessage: errors[0].message });
  }
  return body;
};

// Helper function for query validation
export const validateQuery = <T extends TSchema>(event: H3Event, schema: T): Static<T, []> => {
  const query = getQuery(event);
  const errors = [...TypeCompiler.Compile(schema).Errors(query)];
  if (errors.length !== 0) {
    throw createError({ statusCode: 400, statusMessage: errors[0].message });
  }
  return query;
};
