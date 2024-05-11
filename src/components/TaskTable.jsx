import { Box } from "@chakra-ui/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DATA from "../data";
import { useState } from "react";

const columns = [
  {
    header: "TASK",
    accessorKey: "task",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "STATUS",
    accessorKey: "status",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "DUE",
    accessorKey: "due",
    cell: (props) => <p>{props.getValue()}</p>,
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
  });

  console.log(table.getHeaderGroups());
  return (
    <Box>
      <Box className="table">
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" key={header.id}>
                {header.column.columnDef.header}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default TaskTable;
