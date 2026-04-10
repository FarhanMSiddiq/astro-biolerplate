/**
 * capitalize words
 *
 * Example usage:
 * ```
 * capitalizeWords("testing"); // "Testing" ```
 *
 * @returns {string}
 */

export const capitalizeWords = (text: string | null | undefined) => {
  if (text == null || text == undefined) {
    return "-";
  }

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
