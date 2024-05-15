import { Box } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../data";
import { useState } from "react";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";

const columns = [
  {
    header: "TASK",
    accessorKey: "task",
    size: 225,
    // cell: (props) => <p>{props.getValue()}</p>,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    header: "STATUS",
    accessorKey: "status",
    // cell: (props) => <p>{props.getValue()?.name}</p>,
    cell: StatusCell,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
  {
    header: "DUE",
    accessorKey: "due",
    // cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
    cell: DateCell,
  },
  {
    header: "NOTES",
    accessorKey: "notes",
    size: 225,
    // cell: (props) => <p>{props.getValue()}</p>,
    cell: EditableCell,
  },
];
const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row
          )
        ),
    },
  });

  console.log("data", data);
  return (
    <Box>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "getIsResizing" : ""
                  }`}
                ></Box>
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default TaskTable;
