# Tazrout — MQTT Broker Local Setup Guide

This guide walks you through setting up the Mosquitto MQTT broker on your local machine
using the configuration files from the `mqtt setup/` folder.  
It covers both **Linux (Kali / Ubuntu / Debian / Raspberry Pi)** and **Windows**.

---

## What is inside the zip

| File | Purpose |
|---|---|
| `mosquitto.conf` | Main Mosquitto config — enables persistence and loads `conf.d/` |
| `tazrout.conf` | Project-specific config — sets listener, auth, ACL paths |
| `passwd` | Encrypted password file — contains all broker user credentials |
| `acl` | Access control list — defines who can publish/subscribe to which topics |
| `password.txt` | Plain-text reference of passwords (**do not share or commit this**) |

---

## Credentials reference

> These are the credentials for local testing only. Change them before deploying to the Raspberry Pi.

| Username | Password | Role |
|---|---|---|
| `gateway` | `gateway123` | LoRa gateway bridge — publishes sensor data |
| `backend` | `backend123` | FastAPI backend — subscribes to all topics |
| `ai` | `ai123` | AI engine — reads sensors, publishes decisions |
| `dashboard` | `dashboard123` | Flutter dashboard — read-only subscriber |

> ⚠️ **Important:** The ACL file references the user `ai_engine` but the passwd file
> registers the user as `ai`. These must match. Until this is fixed, either:
> - Rename the user in `passwd` to `ai_engine` by running `mosquitto_passwd` again, **or**
> - Edit the ACL file and replace `user ai_engine` with `user ai`
>
> See the fix instructions at the bottom of this guide.

---

## Setup on Linux (Kali / Ubuntu / Debian / Raspberry Pi)

### Step 1 — Install Mosquitto

```bash
sudo apt update
sudo apt install mosquitto mosquitto-clients -y
```

Verify it is installed:
```bash
mosquitto --version
```

---

### Step 2 — Copy the config files

```bash
# Copy the main config (replaces the default)
sudo cp mosquitto.conf /etc/mosquitto/mosquitto.conf

# Copy the project config into conf.d/
sudo cp tazrout.conf /etc/mosquitto/conf.d/tazrout.conf
```

---

### Step 3 — Copy the password file

```bash
sudo cp passwd /etc/mosquitto/passwd

# Lock down permissions — only root should read this file
sudo chmod 600 /etc/mosquitto/passwd
sudo chown mosquitto:mosquitto /etc/mosquitto/passwd
```

---

### Step 4 — Copy the ACL file

```bash
sudo cp acl /etc/mosquitto/acl

sudo chmod 600 /etc/mosquitto/acl
sudo chown mosquitto:mosquitto /etc/mosquitto/acl
```

---

### Step 5 — Verify the tazrout.conf paths match

Open `tazrout.conf` and confirm the paths point to where you just copied the files:

```bash
cat /etc/mosquitto/conf.d/tazrout.conf
```

Expected output:
```
listener 1883
allow_anonymous false
password_file /etc/mosquitto/passwd
acl_file /etc/mosquitto/acl
log_dest stdout
log_type all
```

If you placed the files in different locations, update the `password_file` and `acl_file`
lines to match.

---

### Step 6 — Restart Mosquitto

```bash
sudo systemctl restart mosquitto
sudo systemctl status mosquitto
```

You should see `active (running)`. If it says `failed`, check the config syntax:

```bash
sudo mosquitto -c /etc/mosquitto/mosquitto.conf --test-config
```

---

### Step 7 — Test the broker

**Test 1 — anonymous connection is rejected:**
```bash
mosquitto_pub -h localhost -t "tazrout/test" -m "hello"
# Expected: Connection error: Connection Refused: not authorised.
```

**Test 2 — authenticated connection works:**

Open two terminals.

Terminal 1 — subscribe as backend:
```bash
mosquitto_sub -h localhost -p 1883 -u backend -P backend123 -t "tazrout/#" -v
```

Terminal 2 — publish as gateway:
```bash
mosquitto_pub -h localhost -p 1883 -u gateway -P gateway123 \
  -t "tazrout/zones/zone_a/sensors" \
  -m '{"packet_type":"SENSOR_READING","zone_id":"zone_a"}'
```

You should see the message appear immediately in Terminal 1.

**Test 3 — ACL enforcement (gateway cannot publish valve commands):**
```bash
mosquitto_pub -h localhost -u gateway -P gateway123 \
  -t "tazrout/zones/zone_a/valve/command" -m "test"
# Expected: no delivery — gateway has no write permission on this topic
```

---

## Setup on Windows

### Step 1 — Install Mosquitto

Download the latest 64-bit installer from `https://mosquitto.org/download/`  
Run it, keep all defaults, make sure **Service** is checked during installation.

Add Mosquitto to your PATH:
1. Search for **Environment Variables** in the Start menu
2. Under System Variables → Path → New
3. Add `C:\Program Files\mosquitto`
4. Click OK on all windows, then open a new terminal and verify: `mosquitto --version`

---

### Step 2 — Copy the config files

Open **Command Prompt as Administrator**:

```cmd
copy mosquitto.conf "C:\Program Files\mosquitto\mosquitto.conf"
copy tazrout.conf "C:\Program Files\mosquitto\tazrout.conf"
copy passwd "C:\Program Files\mosquitto\passwd"
copy acl "C:\Program Files\mosquitto\acl"
```

---

### Step 3 — Update tazrout.conf paths for Windows

On Windows the paths use backslashes and a different base directory.  
Open `C:\Program Files\mosquitto\tazrout.conf` in Notepad as Administrator
and update it to:

```
listener 1883
allow_anonymous false
password_file C:\Program Files\mosquitto\passwd
acl_file C:\Program Files\mosquitto\acl
log_dest stdout
log_type all
```

Then open `C:\Program Files\mosquitto\mosquitto.conf` and make sure the bottom contains:

```
include_dir C:\Program Files\mosquitto
```

Or simply add this line at the bottom if it is not already there.

---

### Step 4 — Restart the Mosquitto service

Open **Command Prompt as Administrator**:

```cmd
net stop mosquitto
net start mosquitto
```

Verify it is listening:
```cmd
netstat -an | findstr 1883
```
You should see `0.0.0.0:1883  LISTENING`.

---

### Step 5 — Test the broker (same as Linux)

```cmd
rem Anonymous should be rejected
mosquitto_pub -h localhost -t "tazrout/test" -m "hello"

rem Authenticated should work
mosquitto_sub -h localhost -u backend -P backend123 -t "tazrout/#" -v
mosquitto_pub -h localhost -u gateway -P gateway123 -t "tazrout/zones/zone_a/sensors" -m "{\"packet_type\":\"SENSOR_READING\"}"
```

---

## Connecting from Python (paho-mqtt)

Install the library:
```bash
pip install paho-mqtt
```

Basic connection pattern — use this for any service (backend, AI engine, etc.):

```python
import paho.mqtt.client as mqtt

BROKER   = "localhost"    # change to Pi's IP when deploying
PORT     = 1883
USERNAME = "backend"      # change per service
PASSWORD = "backend123"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected")
        client.subscribe("tazrout/#")
    else:
        print(f"Failed to connect — code {rc}")

def on_message(client, userdata, msg):
    print(f"{msg.topic} → {msg.payload.decode()}")

client = mqtt.Client(client_id="tazrout-backend")
client.username_pw_set(USERNAME, PASSWORD)
client.on_connect = on_connect
client.on_message = on_message
client.connect(BROKER, PORT, keepalive=60)
client.loop_forever()
```

---

## Fixing the ai / ai_engine username mismatch

The `passwd` file registers the AI user as `ai` but the `acl` file references `ai_engine`.
They must match for ACL rules to apply. Pick one of these two fixes:

**Option A — rename the passwd user to `ai_engine` (recommended, keeps ACL as-is):**

```bash
# On Linux
sudo mosquitto_passwd -D /etc/mosquitto/passwd ai          # delete old user
sudo mosquitto_passwd /etc/mosquitto/passwd ai_engine      # add correct user
sudo systemctl restart mosquitto
```

```cmd
rem On Windows (in C:\Program Files\mosquitto)
mosquitto_passwd -D passwd ai
mosquitto_passwd passwd ai_engine
net stop mosquitto && net start mosquitto
```

**Option B — edit the ACL file to use `ai` instead:**

```bash
sudo nano /etc/mosquitto/acl
# Change the line:  user ai_engine
# To:               user ai
sudo systemctl restart mosquitto
```

---

## Topic tree reference

```
tazrout/
├── zones/
│   └── {zone_id}/
│       ├── sensors          ← gateway publishes  │ backend + ai read
│       ├── state            ← gateway publishes  │ backend reads
│       ├── valve/
│       │   ├── command      ← ai publishes       │ gateway reads
│       │   └── ack          ← gateway publishes  │ backend + ai read
│       └── alert            ← gateway / ai publish
├── ai/
│   ├── decisions            ← ai publishes
│   ├── decisions/latest     ← ai publishes (retained)
│   └── alerts               ← ai publishes
├── system/
│   ├── gateway/
│   │   ├── heartbeat        ← gateway publishes
│   │   └── status           ← gateway publishes (retained)
│   ├── backend/
│   │   └── status           ← backend publishes (retained)
│   └── emergency/
│       ├── alert            ← ai / gateway publish
│       └── status           ← backend publishes (retained)
└── dashboard/
    └── notifications        ← backend publishes
```

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `Connection Refused: not authorised` on valid user | passwd file path wrong in tazrout.conf | Check `password_file` path, restart broker |
| Messages published but subscriber receives nothing | ACL blocking the subscriber | Check `topic read` permission for that user |
| Mosquitto fails to start | Config syntax error | Run `mosquitto -c /path/to/mosquitto.conf --test-config` |
| `Connection Refused: bad user name or password` | Wrong credentials or user doesn't exist | Re-check password.txt, verify user exists in passwd |
| ACL rules not applying to AI user | `ai` vs `ai_engine` mismatch | Apply the fix described in the mismatch section above |
