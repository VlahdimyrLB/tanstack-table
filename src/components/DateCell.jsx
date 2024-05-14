import { Center, Icon, Box } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../components/icons/CalendarIcon";
import { forwardRef } from "react";

const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
  <Center ref={ref} onClick={onClick} cursor="pointer">
    {value ? (
      <>
        {value}
        <Box
          pos="absolute"
          right={3}
          fontSize="md"
          color="red.300"
          onClick={() => {
            clearDate();
          }}
        >
          &times;
        </Box>
      </>
    ) : (
      <Icon as={CalendarIcon} fontSize="xl"></Icon>
    )}
  </Center>
));
const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue();
  const { updateData } = table.options.meta;
  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MMM d"
      selected={date}
      onChange={(date) => updateData(row.index, column.id, date)}
      customInput={
        <DateCustomInput
          clearDate={() => updateData(row.index, column.id, null)}
        />
      }
    />
  );
};
export default DateCell;
