import React from "react";
import { Tooltip as PrimeTooltip } from "primereact/tooltip";
import type { TooltipProps } from "primereact/tooltip";
// Importar estilos personalizados para el tooltip
import "./Tooltip.css";

/**
 * Small wrapper around PrimeReact Tooltip to centralize imports and defaults.
 * Usage:
 *  <Tooltip target=".profileDetailItem" position="top" />
 * or pass any PrimeReact Tooltip props.
 */
const Tooltip: React.FC<Partial<TooltipProps>> = (props) => {
  return <PrimeTooltip {...(props as TooltipProps)} />;
};

export default Tooltip;
