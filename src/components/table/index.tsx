import { useMemo, useState } from "react";
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  MRT_TableContainer,
} from "material-react-table";
import { data as initData, type TypeTable } from "./makeData";
import { TypeFolderList } from "../folderList/folderListTable";
import { type OnChangeFn } from "../state/folderList";

interface TableProps {
  draggingRow: MRT_Row<TypeTable> | null;
  setDraggingRow: OnChangeFn<MRT_Row<TypeTable> | null>;
  hoveredTable: string | null;
  setHoveredTable: (tableName: string | null) => void;
  hoveredRow: MRT_Row<TypeFolderList> | null;
  setHoveredRow: OnChangeFn<MRT_Row<TypeFolderList> | null>;
}

const Table = ({
  draggingRow,
  setDraggingRow,
  hoveredTable,
  setHoveredTable,
  hoveredRow: propsHoveredRow,
  setHoveredRow,
}: TableProps) => {
  const columns = useMemo<MRT_ColumnDef<TypeTable>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "city",
        header: "City",
      },
    ],
    []
    //end
  );

  const [data, setData] = useState(() => initData);

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    enableRowOrdering: true,
    enableSorting: false,
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data.splice(
            (hoveredRow as MRT_Row<TypeTable>).index,
            0,
            data.splice(draggingRow.index, 1)[0]
          );
          setData([...data]);
        }
        if (hoveredTable === "folder-list-table") {
          console.log(draggingRow?.original.firstName);
          console.log(propsHoveredRow?.original.path);
        }
        if (hoveredTable === "root-table") {
          console.log(draggingRow?.original.firstName);
          console.log(propsHoveredRow?.original.path);
        }
        setHoveredTable(null);
        setHoveredRow(null);
      },
    }),
  });

  return <MRT_TableContainer table={table} />;
};

export default Table;
