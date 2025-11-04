"use client";

import React, { KeyboardEvent, useState } from "react";

interface ChipsInputProps {
  value?: string[];
  onChange?: (chips: string[]) => void;
  placeholder?: string;
  className?: string;
  delimiter?: string;
}

const ChipsInput = React.forwardRef<HTMLDivElement, ChipsInputProps>(
  (
    {
      value = [],
      onChange,
      placeholder = "Type and press space to add...",
      className = "",
      delimiter = " ",
    },
    ref,
  ) => {
    const [chips, setChips] = useState<string[]>(value);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === delimiter || e.key === "Enter") {
        e.preventDefault();
        addChip();
      } else if (e.key === "Backspace" && !inputValue && chips.length > 0) {
        removeChip(chips.length - 1);
      }
    };

    const addChip = () => {
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !chips.includes(trimmedValue)) {
        const newChips = [...chips, trimmedValue];
        setChips(newChips);
        setInputValue("");
        onChange?.(newChips);
      } else {
        setInputValue("");
      }
    };

    const removeChip = (index: number) => {
      const newChips = chips.filter((_, i) => i !== index);
      setChips(newChips);
      onChange?.(newChips);
    };

    return (
      <div
        ref={ref}
        className={`border-bg-light bg-bg-div focus-within:ring-primary-blue flex flex-wrap content-start gap-2 rounded-xl border-2 px-5 py-3 focus-within:ring-2 ${className}`}
      >
        {chips.map((chip, index) => (
          <span
            key={index}
            className="bg-primary-blue flex h-fit items-center gap-1 rounded-full px-3 py-1 text-sm text-white"
          >
            {chip}
            <button
              type="button"
              onClick={() => removeChip(index)}
              className="hover:bg-primary-blue/80 ml-1 rounded-full transition-colors"
              aria-label={`Remove ${chip}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addChip}
          placeholder={chips.length === 0 ? placeholder : ""}
          className="text-sec-netral min-w-[200px] flex-1 bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>
    );
  },
);

ChipsInput.displayName = "ChipsInput";

export default ChipsInput;
