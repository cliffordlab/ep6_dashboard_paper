# Dashboard for Executive Park 6

## Requirements 

Install the necessary python packages for the backend

```bash
cd backend
pip install -r requirements.txt
```

Install the NPM packages necessary

```bash
cd ../dashboard
npm install .
```

## Run the Servers on localhost


Run the Flask server at 

```bash
cd backend
python run.py
```

Run the Dashboard at 

```bash
cd dashboard
npm start
```

## Run the Server with multiple workers
You should have gunicorn installed before using this feature.
This helps in serving multiple worker nodes to handle incoming concurrent requests.

You can specify the number of worker threads with parameter **--workers**.
We are using 5 in this example.

```bash
cd backend
gunicorn --workers 5 --bind 0.0.0.0:9800 run:app
```
