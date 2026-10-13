import { entries as effectEntries, categories as effectCategories } from './catalog';
import { entries as businessEntries } from './business/catalog.generated';

// Functional categories come from one authored map. Providers remain light
// searchable metadata, while every implementation stays behind its lazy edge.
export const entries = [...effectEntries, ...businessEntries];
export const categories = effectCategories.map(category => ({
  ...category,
  count: entries.filter(entry => entry.category === category.id).length,
}));
