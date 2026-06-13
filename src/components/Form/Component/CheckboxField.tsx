import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./CheckboxField.css";

type OptionType = {
  label: string;
  value: string;
  disabled?: boolean;
};

type CheckboxFieldProps = {
  name: string;
  options: OptionType[];
  showCheckAll?: boolean;
  rules?: any;
  onCustomOnChange?: (value: string[]) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  options,
  showCheckAll = false,
  rules,
  onCustomOnChange,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const value: string[] = field.value || [];

        const allValues = options.map((o) => o.value);
        const checkAll = value.length === allValues.length;
        const indeterminate =
          value.length > 0 && value.length < allValues.length;

        const toggleOption = (val: string) => {
          let newValue;

          if (value.includes(val)) {
            newValue = value.filter((v) => v !== val);
          } else {
            newValue = [...value, val];
          }

          field.onChange(newValue);
          onCustomOnChange?.(newValue);
        };

        const handleCheckAll = () => {
          const newValue = checkAll ? [] : allValues;
          field.onChange(newValue);
          onCustomOnChange?.(newValue);
        };

        return (
          <div className="checkbox-wrapper">
            {/* ✅ Check All */}
            {showCheckAll && (
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={checkAll}
                  onChange={handleCheckAll}
                />
                <span className="checkbox-box">
                  {checkAll && <span className="checkmark" />}
                  {!checkAll && indeterminate && (
                    <span className="indeterminate" />
                  )}
                </span>
                <span className="checkbox-label">Check all</span>
              </label>
            )}

            {/* Divider */}
            {showCheckAll && <div className="divider" />}

            {/* Options */}
            <div
              className={`checkbox-group ${fieldState.error ? "error" : ""}`}
            >
              {options.map((opt) => {
                const isChecked = value.includes(opt.value);

                return (
                  <label
                    key={opt.value}
                    className={`checkbox-item ${
                      opt.disabled ? "disabled" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={opt.disabled}
                      onChange={() => toggleOption(opt.value)}
                    />

                    <span className="checkbox-box">
                      {isChecked && <span className="checkmark" />}
                    </span>

                    <span className="checkbox-label">{opt.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Error */}
            {fieldState.error && (
              <p className="error-text">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default CheckboxField;
