export default function moveItem(sourceIndex, destinationIndex, sourceItems) {
  if (sourceIndex === destinationIndex) {
    return [...sourceItems];
  }
  const readOnlyIndex = sourceItems.findIndex((item) => item.isReadonly);

  if (destinationIndex >= readOnlyIndex) {
    // Other, read-only category should be last! Can't drag outside..
    return [...sourceItems];
  }

  const res = sourceItems.map((item, index) => {
    if (sourceIndex < destinationIndex) {
      if (index < sourceIndex || index > destinationIndex) return item;
      if (index > sourceIndex) {
        return { ...item, order: item.order - 1 };
      }
    } else {
      if (index > sourceIndex || index < destinationIndex) return item;
      if (index < sourceIndex && index >= destinationIndex) {
        return { ...item, order: item.order + 1 };
      }
    }
    if (index === sourceIndex) {
      return { ...item, order: destinationIndex };
    }
  });
  return res.sort((a, b) => a.order - b.order);
}
