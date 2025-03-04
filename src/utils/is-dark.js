// Function to calculate luminance of a hex color
function getLuminance(hex) {
  let r = parseInt(hex?.slice(1, 3), 16) / 255;
  let g = parseInt(hex?.slice(3, 5), 16) / 255;
  let b = parseInt(hex?.slice(5, 7), 16) / 255;

  // Convert to linear RGB (gamma correction)
  r = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  g = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
  b = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;

  // Calculate luminance using the formula
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance;
}

// Function to check if the color is light or dark
export default function isDarkColor(hex) {
  const luminance = getLuminance(hex);
  return luminance < 0.5;
}
