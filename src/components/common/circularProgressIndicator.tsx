import { CircularProgress, Container } from "@mui/material";
import React from "react";

const CircularProgressIndicator = () => {
  return (
    <Container
      style={{
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
};
export default CircularProgressIndicator;
