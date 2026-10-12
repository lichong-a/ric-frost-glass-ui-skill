import { entries as effectEntries, categories as effectCategories } from './catalog';
import { entries as businessEntries, categories as businessCategories } from './business/catalog.generated';

// Keep the frozen effect catalog separate; the gallery shares light metadata.
export const entries = [...effectEntries, ...businessEntries];
export const categories = [...effectCategories, ...businessCategories];
