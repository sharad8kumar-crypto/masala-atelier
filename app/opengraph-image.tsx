import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} - Modern Indian Kitchen`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#14110f",
          color: "#f5ede0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 10,
            color: "#e8a33d",
            textTransform: "uppercase",
          }}
        >
          Modern Indian Kitchen
        </div>
        <div style={{ display: "flex", fontSize: 104, marginTop: 24, fontWeight: 700 }}>
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            width: 160,
            height: 3,
            background: "#e8a33d",
            marginTop: 36,
          }}
        />
        <div style={{ display: "flex", fontSize: 34, marginTop: 36, color: "#b8ab98" }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}