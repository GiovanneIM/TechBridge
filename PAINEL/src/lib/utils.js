import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// URL base da API
export const API_URL = 'http://techbridge-production-9b20.up.railway.app/techbridge'