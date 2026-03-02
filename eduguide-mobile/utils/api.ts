const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, '');

const DEFAULT_API_BASE_URL = 'https://vibrant-enjoyment-production.up.railway.app';

export const API_BASE_URL = normalizeBaseUrl(
  (process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL) as string
);