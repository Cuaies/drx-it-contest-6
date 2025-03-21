/**
 * Checks if string passes the `Date` format.
 * @param dateString String to test.
 */
export const isValidStringDate = (dateString: string): boolean => {
  const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return datePattern.test(dateString);
};
