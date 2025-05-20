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
  ExpandedState,
  getExpandedRowModel,
  getGroupedRowModel,
  GroupingState,
} from "@tanstack/react-table";
import { useState, ChangeEvent } from "react";
import { Input } from "../../ui/input";
import { MLBGame } from "../../../types/MLBTypes";

// type MLBGames = {
//   game_id: string;
//   game_date: string;
//   home_team: string;
//   away_team: string;
//   home_score: number;
//   away_score: number;
//   venue: string;
//   attendance: number;
//   game_duration: string;
//   weather: string;
//   temperature: number;
//   wind_speed: number;
//   wind_direction: string;
//   precipitation: number;
//   humidity: number;
//   pressure: number;
//   visibility: number;
//   cloud_cover: number;
//   wind_chill: number;
//   heat_index: number;
//   dew_point: number;
//   uv_index: number;
//   solar_radiation: number;
//   moon_phase: string;
//   sunrise: string;
//   sunset: string;
// };

interface MLBTableProps {
  games: MLBGame[];
}

const MLBTable = ({ games }: MLBTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'game_date', desc: true }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [grouping, setGrouping] = useState<GroupingState>(['game_date']);

  const columnHelper = createColumnHelper<MLBGame>();

  const columns = [
    columnHelper.accessor("game_date", {
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("home_name", {
      header: "Home Team",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("away_name", {
      header: "Away Team",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("home_score", {
      header: "Home Score",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("away_score", {
      header: "Away Score",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("current_inning", {
      header: "Inning",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("summary", {
      header: "Summary",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: games,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      expanded,
      grouping,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
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
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
            {table.getRowModel().rows.map((row) => {
              const gameDate = new Date(row.original.game_date);
              const today = new Date();
              const isToday = gameDate.toDateString() === today.toDateString();
              
              return (
                <>
                  <tr 
                    key={row.id} 
                    className={`border-b ${isToday ? 'border-2 border-green-500' : ''} cursor-pointer hover:bg-gray-50 ${row.getIsGrouped() ? 'bg-gray-100 font-semibold' : ''}`}
                    onClick={() => row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && !row.getIsGrouped() && (
                    <tr className="bg-gray-50">
                      <td colSpan={table.getAllColumns().length} className="px-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Pitchers</h4>
                            <p>Home: {row.original.home_probable_pitcher}</p>
                            <p>Away: {row.original.away_probable_pitcher}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Game Details</h4>
                            <p>Game Type: {row.original.game_type}</p>
                            <p>Double Header: {row.original.doueble_header}</p>
                            <p>Inning State: {row.original.inning_state}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
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

export default MLBTable; 