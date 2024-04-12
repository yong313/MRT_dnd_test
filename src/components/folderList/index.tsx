import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_Row,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export type TypeFolderList = {
  name: string;
  path?: string;
  subRows?: TypeFolderList[];
};

export const data: TypeFolderList[] = [
  {
    name: "Dylan",
    path: "/dylan",
    subRows: [
      {
        name: "Ervin",
        path: "/dylan/ervin",
        subRows: [
          {
            name: "Jordane",
            path: "/dylan/ervin/jordane",
            subRows: [
              {
                name: "Branson",
                path: "/dylan/ervin/jordane/branson",
                subRows: [
                  {
                    name: "Bransonqwer",
                    path: "/dylan/ervin/jordane/branson/bransonqwer",
                  },
                ],
              },
            ],
          },
          {
            name: "Jordazxcvn",
            path: "/dylan/jordane",
            subRows: [
              {
                name: "sBsransonasdf",
                path: "/dylan/jordane/sBsransonasdf",
                subRows: [],
              },
            ],
          },
        ],
      },
      {
        name: "Brittanydf",
        path: "/dylan/Brittanydf",
        subRows: [],
      },
    ],
  },
  {
    name: "Raquweel",
    path: "/raquweel",
    subRows: [
      {
        name: "Bransonerq",
        path: "/raquweel/branqson",
        subRows: [],
      },
    ],
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

const FolderList = ({
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
          const paddingLeft = `${row.depth * 15.5}px`;
          const isDisabled = !row.original.subRows?.length;
          const iconColor = isDisabled ? "#ccc" : "default";

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingLeft,
              }}
            >
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  row.toggleExpanded();
                  setSelectedName(row.id);
                }}
                aria-label="expand row"
                disabled={isDisabled}
                sx={{
                  color: iconColor,
                  margin: " 0 0.55rem",
                }}
              >
                {row.getIsExpanded() || isDisabled ? (
                  <KeyboardArrowDown />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
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
    enableExpandAll: false,
    enableExpanding: true,
    filterFromLeafRows: true,
    getRowId: (originalRow) => `folder-list-table-${originalRow.name}`,
    getSubRows: (row) => row.subRows,
    initialState: {
      globalFilter: false,
      columnVisibility: {
        expand: false,
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
    displayColumnDefOptions: {
      "mrt-row-expand": {
        size: 0,
        enableHiding: false,
        visibleInShowHideMenu: true,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    },

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
        height: "100%",
        overflowX: "auto",
      },
    },

    muiTableBodyRowProps: ({ row }) => ({
      onDragEnter: () => {
        setHoveredRow(row);
        setHoveredTable("folder-list-table");
      },
      onClick: () => {
        row.toggleExpanded();
        setSelectedName(row.id);
      },
      sx: {
        height: "2.15rem",
        backgroundColor:
          hoveredRow?.original.name === row.original.name
            ? "#604bcc"
            : selectedName === row.id
            ? "#e2dcff"
            : "#fff",
        cursor: "pointer",
        "td:nth-of-type(1)": {
          display: "none",
        },
        div: {
          color:
            hoveredRow?.original.name === row.original.name
              ? "#fff"
              : selectedName === row.id
              ? "#604bcc"
              : "#454545",
          fontWeight: selectedName === row.id ? "800" : undefined,
        },
        button: {
          color:
            hoveredRow?.original.name === row.original.name
              ? "#fff !important"
              : selectedName === row.id
              ? "#604bcc"
              : undefined,
        },
      },
    }),

    muiTableBodyCellProps: {
      sx: {
        border: "unset",
        padding: 0,
        borderRadius: "0.3rem",

        "& button": {
          padding: 0,
          width: 20,
          height: 20,
        },

        "& button:focus": {
          outline: "unset",
          border: "unset",
        },
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default FolderList;
