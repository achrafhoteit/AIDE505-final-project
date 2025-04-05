# AIDE505 Final Project — Text Summarization Web App

This is a full-stack web application that serves a machine learning model for text summarization. It showcases the entire ML lifecycle — from data versioning and training to model deployment via a Flask API, all tied together in a React + Node.js web interface.

## Project Overview

- **Data versioning with DVC**
- **Model tracking and registry with MLflow**
- **Cloud syncing to DagsHub**
- **Model serving via Flask**
- **Backend API using Node.js**
- **Frontend using React**
- **Containerization with Docker and Docker Compose**

---

## Project Structure

```bash
.
├── Procfile
├── README.md
├── backend
│   ├── Dockerfile
│   ├── db.js
│   ├── index.js
│   ├── middleware
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   ├── schema.sql
│   ├── setup-db.js
│   └── test-db.js
├── data
│   ├── cnn_dm_subset.csv
│   └── cnn_dm_subset.csv.dvc
├── docker-compose.yml
├── flask
│   ├── Dockerfile
│   ├── flask_app.py
│   └── requirements.txt
├── frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── ml.ipynb
├── mlruns
│   ├── 0
│   ├── 403432388898420352
│   └── models
├── requirements.txt
├── results
│   ├── run_01
│   └── run_02
└── venv
    ├── bin
    ├── etc
    ├── include
    ├── lib
    ├── pyvenv.cfg
    └── share

```

## Machine Learning

### Model

- Model: `t5-small` fine-tuned on a summarization dataset.
- Framework: HuggingFace Transformers
- Training done via notebooks + `transformers.Trainer`.

### Versioning with DVC

- Dataset stored locally and versioned with DVC.
- Connected remote: [DagsHub DVC Storage](https://dagshub.com)
- Run the full pipeline:

 ```bash
  dvc repro
```

### Tracking with MLflow

- Metrics, parameters, and model artifacts are logged using MLflow.
- Remote tracking URI: DagsHub MLflow
- Best model checkpoint: checkpoint-750 from run_02


## Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/achrafhoteit/AIDE505-final-project.git
cd AIDE505-final-project
```

### 2. Set Up Environment Variables

Create a .env file with:
```bash
JWT_SECRET=your_secret
DB_URL=postgresql://<your_postgres_url>
```

### 3. Run Everything with Docker Compose
```bash
docker-compose up --build
```

Your app will be available at:
- Frontend: http://localhost:3000
- Backend (Node): http://localhost:3001
- Flask API: http://localhost:5000

## API Endpoints

### Auth
- ```POST /auth/register``` — Create user
- ```POST /auth/login``` - Login and get JWT

### Summarization
- ```POST /summaries``` — Submit a new summary request
- ```GET /summaries``` — Retrieve summary history for authenticated user

### Flask (ML)
- ```POST /summarize``` — Called internally by Node.js to generate a summary

## Model + Data Versioning
- DVC manages the dataset (input)
- MLflow logs metrics, losses, model parameters
- DagsHub is used as a remote backend for both

## Contributors
- Achraf Hoteit
- Ribal Zaiter