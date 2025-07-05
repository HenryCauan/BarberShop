import React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface CustomCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selected, onSelect }) => {
  const isDayDisabled = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const savedAppointments = localStorage.getItem('appointments');
    const appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
    return appointments.some((apt: any) => apt.date === dateStr);
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      locale={ptBR}
      modifiersClassNames={{
        selected: "selected-day",
        today: "today-day",
      }}
      styles={{
        root: {
          color: "white",
          backgroundColor: "black",
          border: "1px solid #aa8c2c",
          borderRadius: "0.5rem",
          padding: "1rem",
        },
        head_cell: {
          color: "#aa8c2c",
          fontWeight: "bold",
        },
        day: {
          color: "white",
          transition: "all 0.3s",
        },
        day_selected: {
          backgroundColor: "#aa8c2c",
          color: "black",
          fontWeight: "bold",
        },
        day_today: {
          color: "#aa8c2c",
          fontWeight: "bold",
        },
        nav: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        },
        nav_button: {
          color: "white !important",
          backgroundColor: "transparent !important",
          border: "none !important",
          cursor: "pointer",
        },
        nav_button_next: {
          color: "white !important",
        },
        nav_button_previous: {
          color: "white !important",
        },
      }}
      components={{
        IconLeft: () => (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon
              points="15,5 7,12 15,19"
              fill="white"
              stroke="white"
            />
          </svg>
        ),
        IconRight: () => (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon
              points="9,5 17,12 9,19"
              fill="white"
              stroke="white"
            />
          </svg>
        ),
      }}
    />
  );
};

export default CustomCalendar; 