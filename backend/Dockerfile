# Run the python API Server
FROM python:3.8
RUN mkdir /backend/
COPY ./ /backend/
RUN pip install -r /backend/requirements.txt
ENV FLASK_ENV productioncd 

WORKDIR /backend/

# Could not test this on my windows machine. Windows sucks!
#CMD ["gunicorn", "--workers", "5", "--bind", "0.0.0.0:9800", "run:app"]
CMD ["python3", "run.py"]

