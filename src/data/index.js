import { cover } from './metadata/cover';
import { presen } from './metadata/presen';
import { intro } from './metadata/intro';
import { about } from './metadata/about';
import { credits } from './metadata/credits';
import { bookChapters } from './chapters'; 

export const fullBook = [
  cover,
  presen,
  intro,
  ...bookChapters,
  about,
  credits
];