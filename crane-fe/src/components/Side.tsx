import React from "react";
import { Badge, Divider, Grid } from "@mui/material";
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
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartState, getStoryStatistics } from "../store/charts/reducer";

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

function SidePanel() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date().toString())
  );
  const story = useAppSelector(selectStory);
  const chart = useAppSelector(chartState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (value !== null) {
      let month = value.month() + 1;
      let year = value.year();
      dispatch(highlightedDays(year + "-" + month));
    }
    dispatch(getStoryStatistics());
  }, [dispatch, value]);

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
      <Divider sx={{ my: 1 }} />
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chart.chart.bar}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1e88e5" />
        </BarChart>
      </ResponsiveContainer>
    </Grid>
  );
}

export default SidePanel;
