import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Icon,
  Text,
  VStack,
  PopoverArrow,
  Flex,
  Box,
} from "@chakra-ui/react";
import FilterIcon from "../components/icons/FilterIcon";
import { STATUSES } from "../data";
import { ColorIcon } from "./StatusCell";

const StatusItem = ({ status, setColumnFilters }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    _hover={{ bg: "gray.800" }}
    onClick={() =>
      setColumnFilters((prev) => {
        const statuses = prev.find((filter) => filter.id === "status")?.value;
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }
      })
    }
  >
    <ColorIcon color={status.color} style={{ marginRight: "5px" }} />
    {status.name}
  </Flex>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" leftIcon={<Icon as={FilterIcon} fontSize={18} />}>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box fontSize="md" fontWeight="bold" mb={4}>
            Filter By:
            <Text fontWeight="bold" color="gray.400" mb={1}>
              Status
            </Text>
          </Box>
          <VStack align="flex-start" spacing={1}>
            {STATUSES.map((status) => (
              <StatusItem
                setColumnFilters={setColumnFilters}
                status={status}
                key={status.id}
              />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default FilterPopover;
