import { Container } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <Container>
      <Link href="/profile/settings">Profile</Link>
    </Container>
  );
}
