import { Menu, MenuButton, MenuItem, MenuList, Box } from "@chakra-ui/react";
import { STATUSES } from "../data";

const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="6px" {...props} />
);
const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
        bg={color || "transparent"}
        color={"gray.900"}
      >
        {name}
      </MenuButton>
      <MenuList>
        {STATUSES.map((status) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, status)}
            key={status.id}
          >
            <ColorIcon color={status.color} style={{ marginRight: "5px" }} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default StatusCell;
