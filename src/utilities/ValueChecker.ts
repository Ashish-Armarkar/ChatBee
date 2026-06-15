export const isNotEmptyArray = (value: unknown): value is any[] =>
  Array.isArray(value) && value.length > 0;

export const isNotEmptyObject = (
  value: unknown,
): value is Record<string, any> =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.keys(value).length > 0;

export const isNotEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const isNullOrUndefined = (value: unknown): boolean =>
  value === null || value === undefined;

export const isValidDate = (value: unknown): value is Date =>
  value instanceof Date && !isNaN(value.getTime());

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !isNaN(value);

export const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

export const isEmptyArray = (value: unknown): boolean =>
  Array.isArray(value) && value.length === 0;

export const isEmptyObject = (value: unknown): boolean =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.keys(value).length === 0;
