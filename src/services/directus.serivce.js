import { Directus } from "@directus/sdk";

export const directus = new Directus("https://r96nmu6p.directus.app", {
  auth: {
    mode: "json",
  },
});