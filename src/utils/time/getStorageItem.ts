/**
 * Gets item and parses it to the data type (number)
 */
export function getStorageItem(key: string): number | undefined {
  const lastActiveString = localStorage.getItem(key);

  return lastActiveString ? JSON.parse(lastActiveString) : undefined;
}
