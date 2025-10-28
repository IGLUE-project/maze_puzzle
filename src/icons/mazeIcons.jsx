export const flagIcon = ({
  color = "rgba(0, 255, 242, 1)",
  bgColor = "rgba(128, 128, 128, 0.5)",
  borderColor = "#000",
  borderWidth = 5,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 518 518"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Fondo cuadrado */}
    <rect
      x={borderWidth / 2}
      y={borderWidth / 2}
      width={512 - borderWidth}
      height={512 - borderWidth}
      rx="40"
      ry="40"
      fill={bgColor}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />

    {/* Palo (sin cambios) */}
    <rect x="120" y="100" width="20" height="320" fill={borderColor} />

    {/* Tela ondeante (más alta hacia abajo) */}
    <path
      d="M140 100 
         C240 140, 260 80, 380 120 
         L380 260 
         C260 220, 240 300, 140 260 Z"
      fill={color}
    />
  </svg>
);

export const iconMap = {
  flag: flagIcon,
};
