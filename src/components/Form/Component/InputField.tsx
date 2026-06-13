import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./InputField.css";

type InputType =
  | "text"
  | "number"
  | "amount"
  | "textarea"
  | "password"
  | "email";

type InputFieldProps = {
  name: string;
  label?: string;
  required?: boolean; // ✅ NEW
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  type?: InputType;
  placeholder?: string;
  decimalCount?: number;
  onCustomOnChange?: (value: string) => void;
  onCustomOnBlur?: (value: string) => void;
  rules?: any;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  required,
  suffix,
  prefix,
  type = "text",
  placeholder,
  decimalCount,
  onCustomOnChange,
  onCustomOnBlur,
  rules,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Auto-detect required from rules
  const isRequired = required || rules?.required;

  // ✅ Format number with commas
  const formatWithComma = (value: string) => {
    if (!value) return "";
    const [intPart, decimalPart] = value.split(".");
    const formattedInt = Number(intPart).toLocaleString("en-US");

    return decimalPart !== undefined
      ? `${formattedInt}.${decimalPart}`
      : formattedInt;
  };

  const removeComma = (value: string) => value.replace(/,/g, "");

  const handleDecimal = (value: string) => {
    if (!decimalCount) return value;
    const regex = new RegExp(`^\\d*\\.?\\d{0,${decimalCount}}$`);
    return regex.test(value) ? value : null;
  };

  const handleChange = (value: string, field: any) => {
    let rawValue = removeComma(value);

    if (type === "amount") {
      const val = handleDecimal(rawValue);
      if (val === null) return;
      rawValue = val;
    }

    field.onChange(rawValue);
    onCustomOnChange?.(rawValue);
  };

  const handleBlur = (value: string, field: any) => {
    field.onBlur();
    onCustomOnBlur?.(value);
  };

  // ✅ Email validation merge
  const getRules = () => {
    if (type === "email") {
      return {
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email format",
        },
        ...rules,
      };
    }

    if (type === "password") {
      return {
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.",
        },
        ...rules,
      };
    }
    return rules;
  };

  const renderInput = (field: any) => {
    const commonProps = {
      className: `search-input ${type === "textarea" ? "textarea" : ""}`,
      placeholder,
      onBlur: () => handleBlur(field.value, field),
      value: field.value || "",
      onChange: (e: any) => handleChange(e.target.value, field),
    };

    switch (type) {
      case "textarea":
        return <textarea {...field} {...commonProps} />;

      case "password":
        return (
          <div className="password-wrapper">
            <input
              {...field}
              {...commonProps}
              type={showPassword ? "text" : "password"}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                /* Eye Off */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10.58 10.58a2 2 0 002.83 2.83"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9.88 5.08A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-0.55 1.23-1.38 2.36-2.41 3.31M6.53 6.53A10.94 10.94 0 003 12c1.73 3.89 6 7 11 7 1.61 0 3.13-.29 4.53-.82"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                /* Eye */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </span>
          </div>
        );

      case "number":
        return <input {...field} {...commonProps} type="number" />;

      case "amount":
        return (
          <input
            {...field}
            {...commonProps}
            type="text"
            value={formatWithComma(field.value || "")}
          />
        );

      case "email":
        return <input {...field} {...commonProps} type="email" />;

      default:
        return <input {...field} {...commonProps} type="text" />;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={getRules()}
      render={({ field, fieldState }) => (
        <div className="input-field-wrapper">
          {/* ✅ Label with required */}
          {label && (
            <label className="input-label">
              {label}
              {isRequired && <span className="required">*</span>}
            </label>
          )}

          <div
            className={`search-container ${fieldState.error ? "error" : ""}`}
          >
            {prefix && <span className="addon">{prefix}</span>}

            {renderInput(field)}

            {/* Clear */}
            {field.value && type !== "textarea" && type !== "password" && (
              <span
                className="clear-btn"
                onClick={() => {
                  field.onChange("");
                  onCustomOnChange?.("");
                }}
              >
                &#10005;
              </span>
            )}

            {suffix && <div className="search-btn">{suffix}</div>}
          </div>

          {/* Error */}
          {fieldState.error && (
            <div className="error-text">{fieldState.error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default InputField;
