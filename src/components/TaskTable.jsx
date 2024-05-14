import { Box } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "../data";
import { useState } from "react";
import EditableCell from "./EditableCell";

const columns = [
  {
    header: "TASK",
    accessorKey: "task",
    size: 225,
    // cell: (props) => <p>{props.getValue()}</p>,
    cell: EditableCell,
  },
  {
    header: "STATUS",
    accessorKey: "status",
    cell: (props) => <p>{props.getValue()?.name}</p>,
  },
  {
    header: "DUE",
    accessorKey: "due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    header: "NOTES",
    accessorKey: "notes",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];
const TaskTable = () => {
  const [data, setData] = useState(DATA);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
