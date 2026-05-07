import json, pathlib

p = pathlib.Path(r'd:\tazrout-website\messages\en.json')
d = json.loads(p.read_text(encoding='utf-8'))

# Hero — remove em-dash and "autonomous AI-driven IoT ecosystem" opener
d['Hero']['description'] = (
    'Small boards in the dirt, a LoRa gateway on the shed roof, a local AI brain '
    'making valve calls, and a screen in Arabic or French showing what happened. '
    'No internet. No cloud bill. All wired by us.'
)

# Pitch value prop — remove em-dash connector
d['Pitch']['value_local_desc'] = (
    'Different crops, different corners of the land. Each zone has its own watering rules.'
)

# System stop 0 — remove trailing em-dash clause
d['System']['stops']['0']['desc'] = (
    'The Tazrout system connects field sensors, a water supply, LoRa radio, '
    'and a central AI server, all running locally without internet.'
)

# FutureFeatures — strip corporate jargon across all phases
d['FutureFeatures']['description'] = (
    'The system runs in a lab. The goal is ten farms by 2028.'
)
d['FutureFeatures']['phases']['1']['description'] = (
    'Pooling anonymized field readings into a platform the Ministry of Agriculture '
    'can actually query. Soil data turned into something that shapes water policy.'
)
d['FutureFeatures']['phases']['2']['description'] = (
    "Tomorrow's rain forecast fed into today's watering schedule. "
    'The model sees a storm coming and skips the morning cycle.'
)
d['FutureFeatures']['phases']['3']['description'] = (
    'Sensor nodes watch for thermal spikes. If the numbers say fire, '
    'every valve shuts and water pressure holds for what matters next.'
)
d['FutureFeatures']['phases']['4']['description'] = (
    "A phone app for the farmer on the other side of the field. "
    "Zone status, alerts, and a stop button. Runs on the farm's WiFi."
)
d['FutureFeatures']['phases']['5']['description'] = (
    'Cameras and entry sensors on the same network. '
    'If someone touches a node that should not be touched, the dashboard knows first.'
)
# Remove "Human-AI Synergy" subtitle
d['FutureFeatures']['phases']['6']['subtitle'] = 'You still call the shots'
d['FutureFeatures']['phases']['6']['description'] = (
    'The AI handles the 3am watering schedule. '
    'You take the wheel when you need to. One button is all it takes.'
)
d['FutureFeatures']['phases']['7']['description'] = (
    'Waterproof enclosures, solar panels, industrial connectors. '
    'Hardware that does not flinch when Batna hits 42 degrees in July.'
)
# Remove "Democratizing technology"
d['FutureFeatures']['phases']['8']['description'] = (
    'Audio alerts in Arabic and Tamazight. '
    'A farmer who cannot read the screen still hears what went wrong.'
)
# Remove "Collaborating with plant disease detection experts"
d['FutureFeatures']['phases']['9']['description'] = (
    'Sensors that catch disease before it shows on leaves. '
    'Built with researchers who study this for a living.'
)

# Install business_body — remove "Plan 1 — Implementation & Setup:" format
d['Install']['business_body'] = (
    'Start with Plan 1: we come to your land, wire the nodes, run the cables, '
    'and hand you a working screen. You pay once for the hardware and our labor.\n\n'
    'Plan 2 is a yearly check-in: we recalibrate sensors, push software updates, '
    'and keep the system honest. Fifteen to twenty percent of what you paid for hardware.\n\n'
    'If you want no subscription, Plan 3 is pay-when-broken: we come when something fails, '
    'you pay for the visit.\n\n'
    'Nothing calls home. No bill from a server you have never seen.'
)

# PitchDeck closing — remove corporate bullet-list ask format
d['PitchDeck']['closing_body'] = (
    'One pilot field, 200 to 500 square metres. A link to INRAA or a cooperative '
    'willing to let us put nodes in real soil. That is the ask.\n\n'
    'By 2028: ten sites running, a data platform the Ministry can actually query, '
    'and a setup small enough that any Algerian farmer can afford it.'
)

# Competitive rows — remove sentence-as-bullet patterns
d['PitchDeck']['competitive_rows'][0]['us'] = (
    'Offline-capable. Valves wired to the local AI. '
    'Trained on Algerian arid-climate data. Your hardware cost, not a cloud subscription.'
)
d['PitchDeck']['competitive_rows'][1]['us'] = (
    'Full AI decision engine on your LAN. No cloud dependency. '
    'No recurring fee for data you already own.'
)
d['PitchDeck']['competitive_rows'][2]['us'] = (
    'Sensor-driven, model-controlled. Multiple zones each with their own rules. '
    'No guessing, no timers.'
)

p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding='utf-8')
print('en.json patched')
