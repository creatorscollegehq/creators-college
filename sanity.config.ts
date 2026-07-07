import { defineConfig } from 'sanity';
   import { structureTool } from 'sanity/structure';
   import { schema } from './src/sanity/schemaTypes';

   const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hp2qnt9q';
   const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

   export default defineConfig({
     basePath: '/studio',
     name: 'default',
     title: 'Creators College Blogs Admin',
     projectId,
     dataset,
     plugins: [structureTool()],
     schema: {
       types: schema.types,
     },
   });
