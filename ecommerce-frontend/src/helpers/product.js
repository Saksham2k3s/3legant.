// getCacheKey to construct a cache key
export const getCacheKey = (page, query, category, minPrice, maxPrice) =>
  `${page}-${query}-${category}-${minPrice}-${maxPrice}`;


// Helper function to construct query parameters string
export const buildQueryParams = (params) => {
  const queryParams = new URLSearchParams();

  // Only append parameters if they have values
  if (params.page) queryParams.append('page', params.page);
  if (params.query) queryParams.append('keyword', params.query);
  if (params.category) queryParams.append('category', params.category);

    // Append price filter if provided
    if (params.minPrice) queryParams.append("minPrice", params.minPrice);
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);

  return queryParams.toString();
};