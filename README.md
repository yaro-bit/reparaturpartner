# B2B Repair Service Landing Page

Static landing page designed for a B2B electronics repair service operating in Linz, Austria.

## Technology Stack

- **Markup:** HTML5 (Semantic elements, section-based layout)
- **Styling:** CSS3 (Responsive design optimized for mobile and desktop viewports)
- **Font:** Montserrat, Argentina (SIL OFL 1.1), self-hosted in `/fonts`. No request to Google Fonts.
- **Hosting & Deployment:** Vercel, United States [Security / Compliance Note: Vercel is a United States-based cloud platform; standard data privacy and compliance terms apply.]
- **Assets:** Photos as WebP in `/img` (about 220 KB total), own vector graphics (inline SVG icons, `img/circuit.svg`, wave dividers)

## Architecture & Features

- Single-page layout with smooth anchor-based navigation
- Integrated contact channels (Direct telephone, mailto links, Telegram web intents)
- Responsive CSS media queries for cross-device compatibility
- Mobile menu via one self-hosted vanilla script (`script.js`, no frameworks, no third-party requests). Without JavaScript the navigation stays visible.
