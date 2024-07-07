import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "100vw",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
}
