import Table from "./components/table";
import FolderListTable from "./components/folderList";
import styled from "@emotion/styled";
import { useFolderList } from "./components/state/folderList";

function App() {
  const {
    selectedName,
    draggingRow,
    hoveredTable,
    hoveredRow,
    setDraggingRow,
    setHoveredRow,
    setHoveredTable,
  } = useFolderList();

  return (
    <Wrapper selected={selectedName === "/"}>
      <div className="container">
        <div className="folder-list-box">
          <div className="folder-mock-box">
            <p>File Manager</p>
            <FolderListTable root />
          </div>
          <div className="divider" />
          <div className="folder-list-item">
            <p>폴더</p>
            <FolderListTable />
          </div>
        </div>
        <div className="table-box">
          <div className="table-mock-box" />
          <Table
            draggingRow={draggingRow}
            setDraggingRow={setDraggingRow}
            hoveredRow={hoveredRow}
            setHoveredRow={setHoveredRow}
            hoveredTable={hoveredTable}
            setHoveredTable={setHoveredTable}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div<{ selected: boolean }>`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .folder-list-box {
    flex-grow: auto;
    height: 100%;
    min-width: 20vw;
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 2rem;
    flex-direction: column;
    gap: 1rem;
    border-right: 2px solid #efefef;

    .divider {
      width: 100%;
      height: 1px;
      background-color: #efefef;
    }

    .folder-list-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p {
        color: #454545;
        font-weight: 700;
        margin: 0;
        margin-left: 1rem;
      }
    }

    .folder-mock-box {
      width: 100%;
      height: auto;
      background-color: #fff;
      flex-grow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      flex-direction: column;
      gap: 1.25rem;

      p {
        color: #454545;
        font-weight: bold;
        width: 100%;
        margin: 0;
        font-size: 1.5rem;
      }

      .name-root {
        width: 100%;
        height: 2.15rem;
        display: flex;
        align-items: center;
        color: #454545;
        font-weight: 600;
        padding-left: 1rem;
        box-sizing: border-box;
        font-size: 0.9rem;
        background-color: ${(props) => (props.selected ? "#e2dcff" : "#fff")};
        cursor: pointer;
        border-radius: 0.3rem;

        :hover {
          background-color: #efefef;
        }
      }
    }
  }

  .table-box {
    padding: 0 5rem;
    flex-grow: 1;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    flex-direction: column;
    gap: 4rem;
    padding: 2rem;

    .table-mock-box {
      width: 100%;
      height: 38.5%;
      background-color: #f4f4f4;
      border-radius: 1rem;
    }
  }
`;
