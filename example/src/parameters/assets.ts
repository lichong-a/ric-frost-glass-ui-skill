// Only asset URLs are bundled here. Importing this table starts no effect or image load.
const artwork = import.meta.glob('../assets/restoration/*.svg', { query: '?url', import: 'default', eager: true });
export function parameterAssetUrl(value: string): string {
  if (value.startsWith('@media/')) return `${import.meta.env.BASE_URL}${value.slice(1)}`;
  if (value.startsWith('@public/')) return `${import.meta.env.BASE_URL}${value.slice('@public/'.length)}`;
  if (value.startsWith('@asset/restoration/')) {
    const name = value.slice('@asset/restoration/'.length);
    const url = artwork[`../assets/restoration/${name}`];
    if (typeof url !== 'string') throw new Error(`Unknown local artwork: ${name}`);
    return url;
  }
  return value;
}
