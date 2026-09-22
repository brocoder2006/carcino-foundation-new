import { createDataAttribute } from "@sanity/visual-editing";

export function createSanityAttribute(id?: string, type?: string, path?: string) {
  if (!id || !type || !path) return undefined;
  try {
    return createDataAttribute({
      id,
      type,
      baseUrl: "/studio",
    })(path).toString();
  } catch {
    return undefined;
  }
}
