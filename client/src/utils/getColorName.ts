import hexToColorName from "hex-to-color-name";

export const getColorName = (hex: string): string => {
  try {
    return hexToColorName(hex);
  } catch (err) {
    return hex;
  }
};
