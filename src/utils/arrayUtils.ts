type Item = { id: string }

export function removeItemAtIndex<TItem>(array: TItem[], index: number) {
  return [...array.splice(0, index), ...array.slice(index + 1)]
}

export function insertItemAtIndex<TItem>(array: TItem[], item: TItem, index: number) {
  return [...array.slice(0, index), item, ...array.slice(index)]
}

export const findItemIndexById = <TItem extends Item>(items: TItem[], id: string) =>
  items.findIndex((item: TItem) => item.id === id)

export const moveItem = <TItem>(array: TItem[], from: number, to: number) => insertItemAtIndex(removeItemAtIndex(array, from), array[from], to)

