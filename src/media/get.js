import { endpoints } from '../utils';
import adapters from '../adapters';

export default async (shortcode) =>
    adapters.media(await endpoints.media(shortcode));
