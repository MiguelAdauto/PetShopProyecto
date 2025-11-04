import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CustomDatePicker.css";

interface CustomDatePickerProps {
  selected?: Date;
  onChange?: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange?.(date);
      setOpen(false);
    }
  };

  return (
    <div className="custom-date-picker">
      <button
        className="date-picker-button"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-calendar3"></i>{" "}
        {selected
          ? selected.toLocaleDateString("es-ES")
          : "Seleccionar fecha"}
      </button>

      {open && (
        <div className="calendar-popup">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
