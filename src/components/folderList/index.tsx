import FolderListTable from "./folderListTable";
import { useFolderList } from "../state/folderList";

const FolderList = ({ root = false }: { root?: boolean }) => {
  const {
    selectedName,
    setSelectedName,
    hoveredRow,
    setHoveredRow,
    setHoveredTable,
  } = useFolderList();

  return (
    <FolderListTable
      root={root}
      selectedName={selectedName}
      setSelectedName={setSelectedName}
      hoveredRow={hoveredRow}
      setHoveredRow={setHoveredRow}
      setHoveredTable={setHoveredTable}
    />
  );
};

export default FolderList;
