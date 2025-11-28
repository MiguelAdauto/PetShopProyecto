import React, { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CustomDatePicker.css";

interface CustomDatePickerProps {
  selected?: Date;
  onChange?: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        onChange?.(date);
        setOpen(false);
      }
    },
    [onChange]
  );

  const toggleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="custom-date-picker">
      <button
        ref={buttonRef}
        className="date-picker-button"
        onClick={toggleOpen}
      >
        <i className="bi bi-calendar3"></i>{" "}
        {selected ? selected.toLocaleDateString("es-ES") : "Seleccionar fecha"}
      </button>

      {open &&
        createPortal(
          <div
            className="calendar-popup-portal"
            style={{ top: coords.top, left: coords.left, position: "absolute", zIndex: 9999 }}
          >
            <DayPicker mode="single" selected={selected} onSelect={handleSelect} />
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomDatePicker;
