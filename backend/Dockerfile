# Run the python API Server
FROM python:3.8
RUN mkdir /backend/
COPY ./ /backend/
RUN pip install -r /backend/requirements.txt
ENV FLASK_ENV productioncd 

WORKDIR /backend/

CMD ["python3", "run.py"]

