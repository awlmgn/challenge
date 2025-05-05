import React, { useState } from 'react';

const daysInMonth = 30; // или динамически подставлять

const InteractiveCalendar = () => {
  const [selectedDays, setSelectedDays] = useState(Array(daysInMonth).fill(false));

  const toggleDay = (index) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const countSelected = selectedDays.filter(Boolean).length;

  return (
    <div className="calendar-wrapper">
      <div className="calendar-grid">
        {selectedDays.map((isSelected, index) => (
          <button
            key={index}
            className={`day-button ${isSelected ? 'selected' : ''}`}
            onClick={() => toggleDay(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="calendar-counter">{countSelected}/30 дней</div>
    </div>
  );
};

export default InteractiveCalendar;
