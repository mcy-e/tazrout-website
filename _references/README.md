# _references/

This folder is **read-only for the agent** — it is filled by the team.
The agent reads these files for context before writing any code.
Nothing in this folder is served by Next.js. It is committed to git for
version-controlled reference sharing between team members.

## What goes where

| Folder | Put here |
|---|---|
| `design-system/` | `app_colors.dart`, `app_typography.dart`, `app_dimensions.dart`, `app_shadows.dart`, `app_theme.dart`, Figma token exports (JSON), any color palette screenshots |
| `dashboard-ui/dark/` | Dashboard screenshots — dark theme (PNG, named by screen: `home.png`, `zones.png`, `analytics.png`, `emergency.png`, `settings.png`, `help.png`) |
| `dashboard-ui/light/` | Same screens, light theme |
| `amazigh/patterns/` | SVG strip patterns used as section dividers in the dashboard |
| `amazigh/symbols/` | Berber symbol SVGs (Wisdom, Balance, Eye, Unity, Life, Fertility) |
| `amazigh/tifinagh/` | Tifinagh glyph SVGs (T, A, Z, R, O, U, T) |
| `technical-docs/architecture/` | System architecture reports (PDF or MD) |
| `technical-docs/backend/` | Spring Boot API docs, endpoint lists, DB schema |
| `technical-docs/frontend/` | Flutter app reports, screen flow docs |
| `technical-docs/mqtt/` | MQTT broker config, topic tree, QoS specs |
| `technical-docs/hardware/` | ESP32 firmware docs, LoRa module specs, Raspberry Pi setup |
| `technical-docs/readme-files/` | README.md files from related repos (firmware, backend, mobile) |

## Workflow

1. Team member drops files into the relevant subfolder
2. Commits with `[ADDED] _references/design-system: token export files`
3. Agent reads on next session — no extra instructions needed
