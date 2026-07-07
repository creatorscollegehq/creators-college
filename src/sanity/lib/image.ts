import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// Use the recommended builder creation pattern to avoid deprecation warnings
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
