import { Box, Tooltip, Typography } from "@mui/material";
import { getFactMaxRatio, getPriceIndicatorColor, round, type PriceIndicatorColor } from "../../../utils/math.ts";

const INDICATOR_COLORS: Record<PriceIndicatorColor, string> = {
  green: "#2e7d32",
  yellow: "#f9a825",
  red: "#d32f2f",
};

const TRACK_COLOR = "#e0e0e0";
const MARKER_COLOR = "#616161";

const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

interface FactMaxIndicatorProps {
  priceFact: number;
  priceMax: number;
}

const FactMaxIndicator = ({ priceFact, priceMax }: FactMaxIndicatorProps) => {
  const fact = Number.isFinite(priceFact) ? priceFact : 0;
  const max = Number.isFinite(priceMax) ? priceMax : 0;

  const color = getPriceIndicatorColor(fact, max);
  const dotColor = INDICATOR_COLORS[color];

  const scaleMax = max > 0 ? max * 1.5 : Math.max(fact, 1);
  const maxPosition = max > 0 ? clamp((max / scaleMax) * 100, 0, 100) : null;
  const factPosition = clamp((fact / scaleMax) * 100, 0, 100);

  const ratioLabel = max > 0
    ? `${round(getFactMaxRatio(fact, max) * 100)}%`
    : (fact > 0 ? "без лимита" : "нет данных");

  return (
    <Tooltip
      title={`Fact ${fact.toFixed(2)}$ / Max ${max > 0 ? `${max.toFixed(2)}$` : "—"} (${ratioLabel})`}
      arrow
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 160 }}>
        <Typography variant="caption" sx={{ minWidth: 40, textAlign: "right" }}>
          {fact.toFixed(2)}$
        </Typography>

        <Box sx={{ position: "relative", flex: 1, height: 16 }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: TRACK_COLOR,
              transform: "translateY(-50%)",
              borderRadius: 1,
            }}
          />

          {maxPosition !== null && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${maxPosition}%`,
                width: "2px",
                backgroundColor: MARKER_COLOR,
              }}
            />
          )}

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: `${factPosition}%`,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: dotColor,
              transform: "translate(-50%, -50%)",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        <Typography variant="caption" sx={{ minWidth: 40 }}>
          {max > 0 ? `${max.toFixed(2)}$` : "—"}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default FactMaxIndicator;
