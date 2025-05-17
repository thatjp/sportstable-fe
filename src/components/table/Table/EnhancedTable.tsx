import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState, ChangeEvent } from "react";
import { Input } from "../../ui/input";

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

interface EnhancedTableProps {
  teamGames: Game[];
}

const EnhancedTable = ({ teamGames }: EnhancedTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper<Game>();

  const columns = [
    columnHelper.accessor("GAME_DATE", {
      header: "Game Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("MATCHUP", {
      header: "Matchup",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("WL", {
      header: "W / L",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("PTS", {
      header: "Points",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FG_PCT", {
      header: "FG %",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("FT_PCT", {
      header: "FT %",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("REB", {
      header: "Rebounds",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("AST", {
      header: "Assists",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: teamGames,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="mt-2">
                        <Input
                          value={(header.column.getFilterValue() as string) ?? ""}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          placeholder={`Filter ${header.column.columnDef.header}`}
                          className="h-8 w-full"
                        />
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="rounded border p-2 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded border p-2 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded border p-2 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded border p-2 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="rounded border p-2"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTable; 