export const getSKUfromName = (name: string) => {
  // remove all symbols except letters and numbers and spaces
  const sku = name.replace(/[^a-zA-Z0-9 ]/g, '');
  // replace all spaces with underscores and prepend "sku"
  return `sku_${sku.replace(/ /g, '_').toLowerCase()}`;
};
