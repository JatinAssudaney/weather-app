// Define your color palette
const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

// Weather-specific colors
const gradientStart = "#422E5A";
const gradientEnd = "#1C1B33";
const cardGradientStart = "#5936B4";
const cardGradientEnd = "#5936B4";
const backgroundColor = "#1F1D47";

export default {
  light: {
    text: "#fff",
    secondaryText: "#EBEBF5",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    gradientStart: gradientStart,
    gradientEnd: gradientEnd,
    cardGradientStart,
    cardGradientEnd,
    backgroundColor,
  },
  dark: {
    text: "#fff",
    secondaryText: "#EBEBF5",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    gradientStart: gradientStart,
    gradientEnd: gradientEnd,
    cardGradientStart,
    cardGradientEnd,
    backgroundColor,
  },
};
