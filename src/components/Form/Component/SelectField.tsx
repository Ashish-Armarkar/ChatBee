import React, { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./SelectField.css";

type OptionType = {
  label: string;
  value: string;
  emoji?: string;
  desc?: string;
};

type SelectFieldProps = {
  name: string;
  label?: string; // ✅ NEW (same as InputField)
  required?: boolean; // ✅ NEW
  options: OptionType[];
  placeholder?: string;
  isMulti?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  rules?: any;
  onCustomOnChange?: (value: any) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  required,
  options,
  placeholder,
  isMulti = false,
  prefix,
  suffix,
  rules,
  onCustomOnChange,
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ✅ Required detection
  const isRequired = required || rules?.required;

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string, field: any) => {
    let newValue;

    if (isMulti) {
      const current = field.value || [];

      if (current.includes(value)) {
        newValue = current.filter((v: string) => v !== value);
      } else {
        newValue = [...current, value];
      }
    } else {
      newValue = value;
      setOpen(false);
    }

    field.onChange(newValue);
    onCustomOnChange?.(newValue);
  };

  const removeOption = (value: string, field: any) => {
    const updated = field.value.filter((v: string) => v !== value);
    field.onChange(updated);
    onCustomOnChange?.(updated);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const selectedValues = field.value || [];

        const filteredOptions = isMulti
          ? options.filter((opt) => !selectedValues.includes(opt.value))
          : options;

        return (
          <div className="select-wrapper" ref={wrapperRef}>
            {/* ✅ Label */}
            {label && (
              <label className="input-label">
                {label}
                {isRequired && <span className="required">*</span>}
              </label>
            )}

            <div
              className={`select-container ${fieldState.error ? "error" : ""}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              {prefix && <span className="addon">{prefix}</span>}

              {/* 🔥 Value Display */}
              <div className="select-input">
                {isMulti ? (
                  selectedValues.length > 0 ? (
                    <div className="tag-container">
                      {selectedValues.map((val: string) => {
                        const option = options.find((o) => o.value === val);

                        return (
                          <div key={val} className="tag">
                            {option?.label}
                            <span
                              className="tag-close"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeOption(val, field);
                              }}
                            >
                              ✖
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="placeholder">{placeholder}</span>
                  )
                ) : (
                  options.find((o) => o.value === field.value)?.label || (
                    <span className="placeholder">{placeholder}</span>
                  )
                )}
              </div>

              {suffix && <div className="search-btn">{suffix}</div>}

              {/* 🔽 Arrow */}
              <span className={`arrow ${open ? "open" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
            </div>

            {/* 🔽 Dropdown */}
            {open && (
              <div className="dropdown">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div
                      key={opt.value}
                      className="dropdown-item"
                      onClick={() => toggleOption(opt.value, field)}
                    >
                      {opt.emoji && <span className="emoji">{opt.emoji}</span>}
                      <span>
                        {opt.label}
                        {opt.desc && ` (${opt.desc})`}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="dropdown-empty">No options</div>
                )}
              </div>
            )}

            {/* ❌ Error */}
            {fieldState.error && (
              <p className="error-text">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default SelectField;
