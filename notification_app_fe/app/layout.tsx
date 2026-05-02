import type { Metadata } from "next"
import ThemeRegistry from "./ThemeRegistry"

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Stay updated with placement, result and event notifications",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
