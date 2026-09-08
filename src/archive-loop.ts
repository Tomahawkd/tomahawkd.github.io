import { archiveColumns, columnFiles, fileLocation } from "./data.ts";

export type ArchiveCell = { lane: number; row: number };
export type ArchiveNavigation =
  { axis: "row" | "lane"; direction: number } | { cell: ArchiveCell };

export const LOOP_COLUMNS = 8;
export const LOOP_ROWS = 25;
export const COLUMN_SPACING = 5.2;
export const ROW_SPACING = 0.62;

export function wrap(value: number, count: number) {
  return ((value % count) + count) % count;
}

// Choose an occurrence of an item in an unbounded sequence. Directional moves
// use adjacent cells instead, so the last-to-first transition never reverses.
export function nearestOccurrence(
  value: number,
  center: number,
  period: number,
) {
  return value + Math.floor((center - value + period / 2) / period) * period;
}

export function fileAtCell({ lane, row }: ArchiveCell) {
  const files = columnFiles(wrap(lane, archiveColumns.length));
  return files[wrap(row - 12, files.length)];
}

export function selectionCell(
  index: number,
  current: ArchiveCell,
  navigation?: ArchiveNavigation,
): ArchiveCell {
  if (navigation && "cell" in navigation) return { ...navigation.cell };
  const next = fileLocation(index);
  const row = nearestOccurrence(
    next.row,
    current.row,
    columnFiles(next.lane).length,
  );
  if (navigation?.axis === "row") {
    return { lane: current.lane, row: current.row + navigation.direction };
  }
  return {
    lane:
      navigation?.axis === "lane"
        ? current.lane + navigation.direction
        : nearestOccurrence(next.lane, current.lane, archiveColumns.length),
    row,
  };
}

// Keep a compact window around the initial selection. Physical pool positions
// are independent of archive IDs and collection lengths.
export function poolCell(index: number): ArchiveCell {
  return {
    lane: 2 - Math.floor(LOOP_COLUMNS / 2) + Math.floor(index / LOOP_ROWS),
    row: 12 - Math.floor(LOOP_ROWS / 2) + (index % LOOP_ROWS),
  };
}

export function visibleCell(index: number, center: ArchiveCell): ArchiveCell {
  const cell = poolCell(index);
  return {
    lane: nearestOccurrence(cell.lane, center.lane, LOOP_COLUMNS),
    row: nearestOccurrence(cell.row, center.row, LOOP_ROWS),
  };
}

export function cellKey(cell: ArchiveCell) {
  return `${cell.lane}:${cell.row}`;
}

export function sameCell(a: ArchiveCell, b: ArchiveCell) {
  return a.lane === b.lane && a.row === b.row;
}
