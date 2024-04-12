import { create } from "zustand";
import { MRT_Row } from "material-react-table";
import { type TypeFolderList } from "../folderList/folderListTable";
import { TypeTable } from "../table/makeData";
export type OnChangeFn<T> = (
  value: T | ((prev: T | null) => T | null) | null | undefined
) => void;

interface FolderList {
  // Initial state
  root?: boolean;
  selectedName: string;
  draggingRow: MRT_Row<TypeTable> | null;
  hoveredTable: string | null;
  hoveredRow: MRT_Row<TypeFolderList> | null;

  // Setter actions
  setDraggingRow: OnChangeFn<MRT_Row<TypeTable> | null>;
  setSelectedName: (name: string) => void;
  setHoveredRow: OnChangeFn<MRT_Row<TypeFolderList> | null>;
  setHoveredTable: (tableName: string | null) => void;
}

const initialState = {
  root: false,
  selectedName: "/",
  draggingRow: null,
  hoveredTable: null,
  hoveredRow: null,
};

export const useFolderList = create<FolderList>((set) => ({
  ...initialState,
  setHoveredTable: (table: string | null) => set({ hoveredTable: table }),
  setSelectedName: (name: string) => set({ selectedName: name }),
  setDraggingRow: (rowOrUpdater) =>
    set((state) => ({
      draggingRow:
        typeof rowOrUpdater === "function"
          ? rowOrUpdater(state.draggingRow)
          : rowOrUpdater !== undefined
          ? rowOrUpdater
          : state.draggingRow,
    })),
  setHoveredRow: (rowOrUpdater) =>
    set((state) => ({
      hoveredRow:
        typeof rowOrUpdater === "function"
          ? rowOrUpdater(state.hoveredRow)
          : rowOrUpdater !== undefined
          ? rowOrUpdater
          : state.hoveredRow,
    })),
}));
