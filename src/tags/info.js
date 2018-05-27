import { endpoints } from '../utils';
import adapters from '../adapters';

export default async (hashtag) =>
    adapters.tags(await endpoints.explore(hashtag));
