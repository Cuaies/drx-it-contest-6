/**
 * Transforms model's attributes into client values.
 * @returns Transformed attribute value.
 */
export const transformModelAttribute = (attribute: string) => {
  attribute = attribute.replace('_', ' ');

  return attribute.charAt(0).toUpperCase() + attribute.slice(1);
};
