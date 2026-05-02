"use client"

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const path = usePathname()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Campus Notifications
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            color="inherit"
            component={Link}
            href="/"
            variant={path === "/" ? "outlined" : "text"}
          >
            All
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/priority"
            variant={path === "/priority" ? "outlined" : "text"}
          >
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
