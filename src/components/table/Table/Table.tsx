import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table";
import { useState, useReducer, useEffect } from "react";

// type definitions for Person object
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

type Game = {
  SEASON_ID: string;
  TEAM_ID: string;
  TEAM_ABBREVIATION: string;
  TEAM_NAME: string;
  GAME_ID: string;
  GAME_DATE: string;
  MATCHUP: string;
  WL: string;
  MIN: string;
  PTS: string;
  FGM: string;
  FGA: string;
  FG_PCT: string;
  FG3M: string;
  FG3A: string;
  FG3_PCT: string;
  FTM: string;
  FTA: string;
  FT_PCT: string;
  OREB: string;
  DREB: string;
  REB: string;
  AST: string;
  STL: string;
  BLK: string;
  TOV: string;
  PF: string;
  PLUS_MINUS: string;
};

interface TableProps {
  teamGames: any;
}

const Table = ({ teamGames }: TableProps) => {

  const rerender = useReducer(() => ({}), {})[1];

  const columnHelper = createColumnHelper<Game>();

  const columns = [
    columnHelper.accessor("SEASON_ID", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("TEAM_ID", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("TEAM_ABBREVIATION", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("TEAM_NAME", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("GAME_ID", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("GAME_DATE", {
      header: "Game Date",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("MATCHUP", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("WL", {
      header: "W / L",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("MIN", {
      header: "Min",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("PTS", {
      header: "Points",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FGM", {
      header: "FGM",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FGA", {
      header: "FGA",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FG_PCT", {
      header: "FG %",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FTM", {
      header: "FTM",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FTA", {
      header: "FTA",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FT_PCT", {
      header: "FT_PCT",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: teamGames,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
};

export default Table;
