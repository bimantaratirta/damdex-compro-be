function kebabToCamel(str: string): string {
    return str.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function snakeToCamel(str: string): string {
    return str.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function pascalToCamel(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

function screamingSnakeToCamel(str: string): string {
    return str
      .toLowerCase()
      .replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function spaceToCamel(str: string): string {
    return str.replace(/\s+([a-z0-9])/g, (_, char) => char.toUpperCase());
}

export function toCamelCase(str: string): string {
    if (str.includes('-')) return kebabToCamel(str);
    if (str.includes('_') && str === str.toUpperCase()) return screamingSnakeToCamel(str);
    if (str.includes('_')) return snakeToCamel(str);
    if (str.includes(' ')) return spaceToCamel(str);
    if (/^[A-Z]/.test(str)) return pascalToCamel(str);
    return str; // already camelCase
  }