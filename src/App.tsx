import { useState } from "react";
import FolderList, { type TypeFolderList } from "./components/folderList";
import Table from "./components/table";
import { type TypeTable } from "./components/table/makeData";
import styled from "@emotion/styled";
import { MRT_Row } from "material-react-table";

function App() {
  const [selectedName, setSelectedName] = useState<string>("/");
  const [draggingRow, setDraggingRow] = useState<MRT_Row<TypeTable> | null>(
    null
  );
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<MRT_Row<TypeFolderList> | null>(
    null
  );

  return (
    <Wrapper selected={selectedName === "/"}>
      <div className="container">
        <div className="folder-list-box">
          <div className="folder-mock-box">
            <p>File Manager</p>
            <p className="name-root" onClick={() => setSelectedName("/")}>
              모든파일
            </p>
          </div>
          <FolderList
            selectedName={selectedName}
            setSelectedName={setSelectedName}
            hoveredRow={hoveredRow}
            setHoveredRow={setHoveredRow}
            hoveredTable={hoveredTable}
            setHoveredTable={setHoveredTable}
          />
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
    gap: 1.85rem;
    border-right: 2px solid #efefef;

    div {
      flex-grow: 1;
    }

    .folder-mock-box {
      width: 100%;
      max-height: 12.5%;
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
