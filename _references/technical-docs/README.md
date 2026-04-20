# Technical Documentation Reference

Drop any documentation files here. Supported formats: PDF, MD, TXT, JSON.

## Purpose
The agent reads these before building pages to:
- Write accurate content for /system (how it works, architecture)
- Write accurate content for /docs (populate MDX files)
- Anticipate common field-deployment problems and document them in /help
- Use real technology names, protocol specs, and pin numbers in diagrams

## Subfolders
- architecture/  → full system architecture reports
- backend/       → Spring Boot API, PostgreSQL schema, endpoint docs
- frontend/      → Flutter screen flow, component tree
- mqtt/          → MQTT broker topics, QoS levels, payload schemas
- hardware/      → ESP32 pinout, LoRa module config, Raspberry Pi setup
- readme-files/  → README.md from firmware repo, backend repo, mobile repo
