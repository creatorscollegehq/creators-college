import { type SchemaTypeDefinition } from 'sanity';
import { categoryType } from './categoryType';
import { postType } from './postType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postType],
};
