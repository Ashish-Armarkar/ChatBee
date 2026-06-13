import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./RadioField.css";

type OptionType = {
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioFieldProps = {
  name: string;
  options: OptionType[];
  type?: "default" | "button";
  rules?: any;
  onCustomOnChange?: (value: string) => void;
};

const RadioField: React.FC<RadioFieldProps> = ({
  name,
  options,
  type = "default",
  rules,
  onCustomOnChange,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="radio-wrapper">
          <div className={`radio-group ${fieldState.error ? "error" : ""}`}>
            {options.map((opt) => {
              const isSelected = field.value === opt.value;

              return (
                <label
                  key={opt.value}
                  className={`radio-item 
                    ${type === "button" ? "radio-button" : ""}
                    ${isSelected ? "selected" : ""}
                    ${opt.disabled ? "disabled" : ""}
                  `}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    checked={isSelected}
                    disabled={opt.disabled}
                    onChange={() => {
                      field.onChange(opt.value);
                      onCustomOnChange?.(opt.value);
                    }}
                  />

                  {/* Default radio circle */}
                  {type === "default" && (
                    <span className="radio-circle">
                      {isSelected && <span className="radio-dot" />}
                    </span>
                  )}

                  {/* Label */}
                  <span className="radio-label">{opt.label}</span>
                </label>
              );
            })}
          </div>

          {fieldState.error && (
            <p className="error-text">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default RadioField;
