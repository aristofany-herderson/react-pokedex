export const shuffle = (array: any[]): any[] => {
  for (let index = array.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * index);

    const currentItem = array[index];

    array[index] = array[newIndex];
    array[newIndex] = currentItem;
  }

  return array;
};