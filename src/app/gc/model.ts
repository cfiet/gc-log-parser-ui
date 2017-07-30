export interface TimeOffset {
  readonly millis: number;
}

export interface HeapSize {
  readonly size: number;
  readonly total: number;
}

export interface Generations {
  readonly eden: number;
  readonly survivor: number;
  readonly old: number;
  readonly humongous: number;
}

export interface GcEvent {
  readonly timeOffset: TimeOffset;
  readonly heapSize: HeapSize;
  readonly generationSizes: Generations;
  readonly allocationRatePerMb: number;
  readonly fullGcs: number;
  readonly youngGcs: number;
  readonly mixed: number;
  readonly remarks: number;
}
