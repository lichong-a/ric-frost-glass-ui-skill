/** Resolve only explicitly opted-in component classes; never decorate descendant DOM. */
export function componentClasses(styles: Readonly<Record<string,string>>, names: string): string {
  return names.split(/\s+/).filter(Boolean).map(name => styles[name] ?? name).join(' ');
}
