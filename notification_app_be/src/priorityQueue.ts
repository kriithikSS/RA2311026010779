// min heap, keeps the top N items
// root = smallest score, so we can quickly drop low scoring ones

export class MinHeap<T> {
  private items: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  push(val: T) {
    this.items.push(val);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (!this.items.length) return undefined;
    const root = this.items[0];
    const tail = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = tail;
      this.sinkDown(0);
    }
    return root;
  }

  top(): T | undefined {
    return this.items[0];
  }

  get size() {
    return this.items.length;
  }

  values(): T[] {
    return [...this.items];
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compare(this.items[i], this.items[parent]) < 0) {
        [this.items[i], this.items[parent]] = [this.items[parent], this.items[i]];
        i = parent;
      } else break;
    }
  }

  private sinkDown(i: number) {
    const n = this.items.length;
    while (true) {
      let min = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.compare(this.items[l], this.items[min]) < 0) min = l;
      if (r < n && this.compare(this.items[r], this.items[min]) < 0) min = r;
      if (min !== i) {
        [this.items[i], this.items[min]] = [this.items[min], this.items[i]];
        i = min;
      } else break;
    }
  }
}
