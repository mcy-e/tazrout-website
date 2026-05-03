# Tazrout System Testing Guide (Software-Only / No Hardware)

Use this guide to test the integration of the Backend, Frontend, and AI Engine *without* the physical ESP32 sensors or LoRa Gateway. We will use the Python simulator to act as the hardware gateway.

## Startup Sequence

### Step 1: Start Mosquitto Broker
```powershell
mosquitto -c "D:\mqtt setup\mosquitto.conf"
```

### Step 2: Start Spring Boot Backend
The backend connects to PostgreSQL (port 5432) and Mosquitto, and will automatically create the `zones` and `ai_decisions` tables.
```powershell
cd D:\TAZROUT-Dashboard\backend
mvn spring-boot:run
```

### Step 3: Start AI Engine
Run the real AI engine. It will connect to Mosquitto and wait silently for sensor data to arrive.
*(Make sure the AI engine folder is properly placed)*
```powershell
cd D:\TAZROUT-Dashboard\Irrigation_ml
python app.py
```

### Step 4: Start the Hardware Simulator
Run the simulator to generate fake sensor readings. The real AI Engine will read this fake data, calculate the necessary water amount, and publish real decisions back!

**IMPORTANT:** You MUST use the `--no-ai` flag so the simulator does not publish conflicting AI decisions against the real AI engine. You can also specify the number of zones and their type!

```powershell
cd D:\TAZROUT-Dashboard\backend\mock_data
python mqtt_simulator.py --no-ai --zones 6 --zone-type "Orchard"
```
*(Run `python mqtt_simulator.py --help` for all options)*

### Step 5: Launch Flutter Dashboard
```powershell
cd D:\TAZROUT-Dashboard\frontend
flutter run -d windows
```

### Verification Checklist
- [ ] Database check: Open pgAdmin and check if the `zones` and `ai_decisions` tables are populating with data.
- [ ] Dashboard displays the simulated zone data (Temperature, Moisture, etc.) coming from `mqtt_simulator.py`.
- [ ] The real AI Engine processes the simulated data and you see its actual calculated decisions appearing in the UI.
- [ ] Clicking "Emergency Stop" triggers the UI warning state (even though there are no physical valves to close).

---

## Common Errors & Fixes

### 1. Dashboard is stuck on "Empty State" or shows no data
- **Cause:** The Flutter app is not receiving WebSocket data, or Mosquitto is down.
- **Fix:** 
  1. Check your `.env` file in the `frontend` folder. It must be `WS_URL=ws://127.0.0.1:8080/api/v1/ws/realtime`.
  2. Verify that the Spring Boot backend is running.
  3. Verify that Mosquitto is running on port 1883.

### 2. Backend throws "Connection refused" or MQTT connection errors
- **Cause:** The Mosquitto broker is not running, or the backend is trying to use the wrong port.
- **Fix:** Run Step 1 again. Ensure Mosquitto is running. Check `application.properties` to ensure the `mqtt.broker.url` is pointing to `tcp://localhost:1883`.

### 3. Backend throws "Connection refused" for PostgreSQL
- **Cause:** The PostgreSQL database is not running or credentials do not match.
- **Fix:** Open pgAdmin or Windows Services and ensure the `postgresql` service is running. Verify that your password matches `spring.datasource.password=mohamed2006` in `application.properties`.

### 4. Simulator crashes immediately
- **Cause:** The `paho-mqtt` library is not installed in your Python environment.
- **Fix:** Run `pip install paho-mqtt` before running the simulator.

### 5. AI Decisions are randomly changing rapidly (Flickering UI)
- **Cause:** You ran the simulator without the `--no-ai` flag while the real AI Engine is also running. They are fighting over the same MQTT topic.
- **Fix:** Stop the simulator (Ctrl+C) and restart it with the `--no-ai` flag: `python mqtt_simulator.py --no-ai`
