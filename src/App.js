import "./App.css";
import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { columnData } from "./columns";
import { LIST_URL } from "./constants";

function App() {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch(LIST_URL)
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      });
  }, []);

  const data = React.useMemo(() => {
    return coins.map((coin) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
      };
    });
  }, [coins]);

  const columns = React.useMemo(() => columnData, [coins]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    gotoPage,
    pageCount,
    page,
    setPageSize,
    prepareRow,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );
  return (
    <div
      style={{
        padding: "2rem",
        margin: "2rem",
        display: "grid",
        maxWidth: "90%",
        width: "90%",
      }}
    >
      <h3>Coins </h3>
      <div style={{ padding: "2rem" }}>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
