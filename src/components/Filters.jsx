import {
  Box,
  InputGroup,
  Input,
  InputRightAddon,
  Icon,
} from "@chakra-ui/react";
import SearchIcon from "../components/icons/SearchIcon";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName =
    columnFilters.find((filter) => filter.id === "task")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  return (
    <Box mb="6">
      <InputGroup size="sm" maxW="12rem">
        <InputRightAddon pointerEvents="none">
          <Icon as={SearchIcon}></Icon>
        </InputRightAddon>
        <Input
          type="text"
          variant="filled"
          placeholder="Task Name"
          borderRadius={5}
          value={taskName}
          onChange={(e) => onFilterChange("task", e.target.value)}
        ></Input>
      </InputGroup>
    </Box>
  );
};
export default Filters;
