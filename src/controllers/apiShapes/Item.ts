export function ItemShape(item: any) {
  return {
    id: item && item.id,
    barcode: item && item.barcode,
    itemName: item && item.itemName,
    category: item && item.category,
    reOrderLevel: item && item.reOrderLevel
  };
}
