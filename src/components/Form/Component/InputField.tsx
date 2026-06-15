import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./InputField.css";

type InputType =
  | "text"
  | "number"
  | "amount"
  | "textarea"
  | "password"
  | "email"
  | "phone";

type InputFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  type?: InputType;
  placeholder?: string;
  decimalCount?: number;
  onCustomOnChange?: (value: string) => void;
  onCustomOnBlur?: (value: string) => void;
  rules?: any;
  maxCount?: number;
  minCount?: number;

  countryCodeName?: string;
};

const COUNTRY_CODES = [
  { code: "+91", country: "🇮🇳" },
  { code: "+1", country: "🇺🇸" },
  { code: "+44", country: "🇬🇧" },
  { code: "+61", country: "🇦🇺" },
  { code: "+65", country: "🇸🇬" },
];

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
  maxCount,
  minCount,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const isRequired = required || rules?.required;

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

    if (maxCount) {
      rawValue = rawValue.slice(0, maxCount);
    }

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

  const getRules = () => {
    const validationRules = {
      ...rules,
    };

    if (type === "phone") {
      validationRules.pattern = {
        value: /^[0-9]+$/,
        message: "Invalid phone number",
      };
    }
    if (minCount) {
      validationRules.minLength = {
        value: minCount,
        message: `Minimum ${minCount} characters required`,
      };
    }

    if (maxCount) {
      validationRules.maxLength = {
        value: maxCount,
        message: `Maximum ${maxCount} characters allowed`,
      };
    }

    if (type === "email") {
      validationRules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      };
    }

    if (type === "password") {
      validationRules.pattern = {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.",
      };
    }

    return validationRules;
  };

  const renderInput = (field: any) => {
    const commonProps = {
      className: `search-input ${type === "textarea" ? "textarea" : ""}`,
      placeholder,
      value: field.value || "",
      maxLength: maxCount,
      onBlur: () => handleBlur(field.value, field),
    };

    switch (type) {
      case "phone":
        return (
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Controller
              name={`${name}_countryCode`}
              control={control}
              defaultValue="+91"
              render={({ field: countryField }) => (
                <select {...countryField} className="country-code-select">
                  {COUNTRY_CODES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.country} {country.code}
                    </option>
                  ))}
                </select>
              )}
            />
            <div
              className=""
              style={{ height: "30px", borderLeft: "1px solid #dcdcdc" }}
            ></div>
            <input
              {...field}
              type="text"
              inputMode="numeric"
              placeholder={placeholder}
              className="search-input"
              value={field.value || ""}
              maxLength={maxCount || 10}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (maxCount) {
                  value = value.slice(0, maxCount);
                }

                field.onChange(value);
                onCustomOnChange?.(value);
              }}
              onKeyDown={(e) => {
                const allowedKeys = [
                  "Backspace",
                  "Delete",
                  "ArrowLeft",
                  "ArrowRight",
                  "Tab",
                  "Home",
                  "End",
                ];

                if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        );
      case "textarea":
        return (
          <textarea
            {...field}
            {...commonProps}
            onChange={(e) => handleChange(e.target.value, field)}
          />
        );

      case "password":
        return (
          <div className="password-wrapper">
            <input
              {...field}
              {...commonProps}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleChange(e.target.value, field)}
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
        return (
          <input
            {...field}
            {...commonProps}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");

              if (maxCount) {
                value = value.slice(0, maxCount);
              }

              field.onChange(value);

              onCustomOnChange?.(value);
            }}
            onKeyDown={(e) => {
              const allowedKeys = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Home",
                "End",
              ];

              if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        );

      case "amount":
        return (
          <input
            {...field}
            {...commonProps}
            type="text"
            value={formatWithComma(field.value || "")}
            onChange={(e) => handleChange(e.target.value, field)}
          />
        );

      case "email":
        return (
          <input
            {...field}
            {...commonProps}
            type="email"
            onChange={(e) => handleChange(e.target.value, field)}
          />
        );

      default:
        return (
          <input
            {...field}
            {...commonProps}
            type="text"
            onChange={(e) => handleChange(e.target.value, field)}
          />
        );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={getRules()}
      render={({ field, fieldState }) => (
        <div className="input-field-wrapper">
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

            {field.value &&
              type !== "textarea" &&
              type !== "password" &&
              type !== "text" && (
                <span
                  className="clear-btn"
                  onClick={() => {
                    field.onChange("");

                    onCustomOnChange?.("");
                  }}
                >
                  ✕
                </span>
              )}

            {suffix && <div className="search-btn">{suffix}</div>}
          </div>

          {maxCount && type !== "number" && (
            <div
              className="fs_12 text-end mt_4"
              style={{
                color: "#8B5E34",
              }}
            >
              {(field.value || "").length}/{maxCount}
            </div>
          )}

          {fieldState.error && (
            <div className="error-text">{fieldState.error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default InputField;
