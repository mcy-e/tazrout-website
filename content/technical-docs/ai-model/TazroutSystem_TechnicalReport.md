# 🌿 Tazrout Smart Irrigation System  
### Technical Report & Client Integration Guide  
**Version 2.0 · ML-Powered Irrigation Decision API**

---

## 1. Executive Summary

The Tazrout Smart Irrigation System is an end-to-end machine learning solution designed to optimize agricultural water usage. It takes real-time sensor readings from the field and answers two critical questions:

- **Question 1 (Classification):** Should the field be irrigated right now?
- **Question 2 (Regression):** If yes, how many litres of water should be applied?

The system consists of:
- A Jupyter Notebook (`TazroutModel_v2.ipynb`) for training and exporting models
- A Flask REST API (`app.py`) for serving predictions

Clients can request predictions via HTTP.

---

## 2. System Architecture Overview

| Layer | Component | Role |
|------|----------|------|
| Training Layer | TazroutModel_v2.ipynb | Train & export ML models |
| Serving Layer | Flask API (app.py) | Serve predictions |
| Storage | classifier.pkl / regressor.pkl | Saved models |
| Client | Any HTTP device | Sends data |

---

## 3. Dataset Description

- 950 samples, no missing values

| Column | Type | Range | Role |
|--------|------|------|------|
| humidity | float | 22–86% | Feature |
| temperature | float | 0.7–44.9°C | Feature |
| soil_moisture | float | 0.05–0.67 | Feature |
| water_level | float | 0.05–0.88 | Feature |
| plant_type | string | categorical | Feature |
| irrigate | int | 0/1 | Target |
| water_amount | float | 0–48.8L | Target |

---

## 4. ML Pipeline

### Classification
Models: Random Forest, XGBoost, Logistic Regression, etc.  
Best: ~94.7% accuracy  
Saved: `model/classifier.pkl`

### Regression
Models: Random Forest, Ridge, XGBoost, etc.  
Metric: MAE  
Saved: `model/regressor.pkl`

---

### Inference Logic

1. Predict irrigate (0/1)
2. If 0 → return 0
3. If 1 → predict water amount

---

## 5. API

### Endpoints

- GET `/` → health check
- POST `/predict` → prediction

### Request
```json
{
  "soil_moisture": 0.18,
  "temperature": 34.5,
  "humidity": 40.1,
  "plant_type": "tomato"
}
```

### Response
```json
{
  "irrigate": 1,
  "water_amount": 3.75
}
```

---

## 6. Client Example (Python)

```python
import requests

url = "http://server:10000/predict"

data = {
    "soil_moisture": 0.18,
    "temperature": 34.5,
    "humidity": 40.1,
    "plant_type": "tomato"
}

print(requests.post(url, json=data).json())
```

---

## 7. Deployment

```bash
pip install flask joblib numpy scikit-learn xgboost
python app.py
```

---

---

## 9. Summary

Full ML pipeline: dataset → training → API → prediction system.
## 10. Notes
The results are not realistic of course, since we do not have actual data , and some data leakage did happen since we have this AI generated dataset
