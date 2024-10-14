import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureUrlFormat(url: string){
  let formattedUrl = url.trim();

  if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
    formattedUrl = "https://" + formattedUrl;
  }

  if (!formattedUrl.includes("www.")) {
    const parts = formattedUrl.split("//");
    formattedUrl = parts[0] + "//www." + parts[1];
  }

  return formattedUrl;
}
export function getFaviconUrl(url: string) {
  const urlObj = new URL(url);
  return `${urlObj.origin}/favicon.ico`;
}