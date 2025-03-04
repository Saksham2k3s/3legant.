// getCacheKey to construct a cache key
export const getCacheKey = (page, query, category) =>
  `${page}-${query}-${category}`;
