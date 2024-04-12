import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

export type TypeFolderList = {
  name: string;
  path?: string;
};

export const data: TypeFolderList[] = [
  {
    name: "모든파일",
    path: "/",
  },
];

type OnChangeFn<T> = (updaterOrValue: T | ((prev: T) => T)) => void;

interface FolderListProps {
  selectedName: string;
  setSelectedName: (name: string) => void;
  hoveredRow: MRT_Row<TypeFolderList> | null;
  setHoveredRow: OnChangeFn<MRT_Row<TypeFolderList> | null>;
  hoveredTable: string | null;
  setHoveredTable: (tableName: string | null) => void;
}

const FolderRoot = ({
  selectedName,
  setSelectedName,
  hoveredRow,
  setHoveredRow,
  hoveredTable,
  setHoveredTable,
}: FolderListProps) => {
  const columns = useMemo<MRT_ColumnDef<TypeFolderList>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ row }) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0 1rem",
              }}
            >
              {row.getValue("name")}
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    getRowId: () => `/`,
    initialState: {
      globalFilter: false,
      columnVisibility: {
        path: false,
      },
    },
    enableTableHead: false,
    enableTableFooter: false,
    enablePagination: false,
    enableGlobalFilter: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnFilters: false,
    enableStickyHeader: false,
    enableStickyFooter: false,
    enableColumnActions: false,

    muiTablePaperProps: {
      elevation: 0,
      sx: {
        minWidth: "100%",
        borderRadius: 0,
      },
    },

    muiTableContainerProps: {
      sx: {
        width: "100%",
        height: "auto",
      },
    },

    muiTableBodyRowProps: ({ row }) => ({
      onDragEnter: () => {
        setHoveredRow(row);
        setHoveredTable("root-table");
      },
      onClick: () => {
        row.toggleExpanded();
        setSelectedName(row.id);
      },
      sx: {
        height: "2.45rem",
        backgroundColor:
          hoveredRow?.original.name === row.original.name
            ? "#604bcc"
            : selectedName === row.id
            ? "#e2dcff"
            : "#fff",
        cursor: "pointer",
        div: {
          color:
            hoveredRow?.original.name === row.original.name
              ? "#fff"
              : selectedName === row.id
              ? "#604bcc"
              : "#454545",
          fontWeight: selectedName === row.id ? "800" : undefined,
        },
      },
    }),

    muiTableBodyCellProps: {
      sx: {
        border: "unset",
        padding: 0,
        borderRadius: "0.3rem",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default FolderRoot;
