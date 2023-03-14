import React from "react";
import { Badge, Grid } from "@mui/material";
import {
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { highlightedDays, selectStory } from "../store/story/reducer";

function ServerDay(props: PickersDayProps<Dayjs> & { hDays?: number[] }) {
  const { hDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && hDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "😀" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

function Bookmark() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date().toString())
  );
  const story = useAppSelector(selectStory);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (value !== null) {
      let month = value.month() + 1;
      let year = value.year();
      dispatch(highlightedDays(year + "-" + month));
    }
  }, [dispatch]);

  const handleMonthChange = (date: Dayjs) => {
    let month = date.month() + 1;
    let year = date.year();
    dispatch(highlightedDays(year + "-" + month));
  };

  return (
    <Grid item xs={12} md={4}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onMonthChange={handleMonthChange}
          slots={{
            day: ServerDay,
          }}
          slotProps={{ day: { hDays: story.story.days } as any }}
        />
      </LocalizationProvider>
    </Grid>
  );
}

export default Bookmark;
