import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import "./OTPField.css";
import TooltipComp from "../../Tooltip/TooltipComp";

type OTPFieldProps = {
  name: string;
  label?: string;
  length?: number;
  rules?: any;
  isRequired?: boolean;
  info?: string;
};

const OTPField: React.FC<OTPFieldProps> = ({
  name,
  label,
  length = 6,
  rules,
  isRequired,
  info,
}) => {
  const { control } = useFormContext();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        minLength: {
          value: length,
          message: `OTP must be ${length} digits`,
        },
        maxLength: {
          value: length,
          message: `OTP must be ${length} digits`,
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "OTP must contain only numbers",
        },
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <div className="input-field-wrapper otp-wrapper">
          {label && (
            <label className="input-label">
              {label}
              {isRequired && <span className="required">*</span>}
              {info && <TooltipComp info={info} size={14} />}
            </label>
          )}

          <div className="otp-container">
            {Array.from({ length }).map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`otp-input ${fieldState.error ? "otp-error" : ""}`}
                value={field.value?.[index] || ""}
                onChange={(e) => {
                  const digit = e.target.value.replace(/\D/g, "");

                  const current = (field.value || "")
                    .padEnd(length, " ")
                    .split("");

                  current[index] = digit;

                  const value = current.join("").trim();

                  field.onChange(value);

                  if (digit && index < length - 1) {
                    inputRefs.current[index + 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" &&
                    !field.value?.[index] &&
                    index > 0
                  ) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </div>

          {fieldState.error && (
            <div className="error-text">{fieldState.error.message}</div>
          )}
        </div>
      )}
    />
  );
};

export default OTPField;
