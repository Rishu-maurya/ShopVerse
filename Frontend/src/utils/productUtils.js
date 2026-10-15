export const getProductCategories = (products) => {
  const categories = new Map();

  products.forEach((product) => {
    const category = product.category?.trim();

    if (category && !categories.has(category.toLowerCase())) {
      categories.set(category.toLowerCase(), category);
    }
  });

  return [...categories.values()];
};
