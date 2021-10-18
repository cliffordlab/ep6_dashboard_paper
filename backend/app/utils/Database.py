"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2021-10-17 20:10:33
  Last Modified : 2021-10-17 20:10:33
  Description : Database Client to Query Audio Data
"""

from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

import socket
from datetime import datetime


class Database():

    def __init__(self, token="X5hQbaQGGwiGvvBGWECL8lSmMyYLmxCNX9_HJ8xwnx75VvW8TD2ZQ5FYS016gpbOi69I7YcpTGxup68PtmemaQ==", org="EP6", url="https://mcibmi1.bmi.emory.edu:8086", verify_ssl=False):
        self.__token = token
        self.__org = org
        self.__url = url

        try:
            self.__client = InfluxDBClient(url=self.__url, token=self.__token, verify_ssl=verify_ssl)
        except Exception as e:
            print(str(e))
            print("Failed creating Influx DB Client.")

        self.__query_api = self.__client.query_api()

    def __query(self, query):
        try:
            result = self.__query_api.query(query, org=self.__org)
        except Exception as e:
            print(str(e))
            print("An Exception occured while querying the database")
            result = ""
        return result

    def __create_query(self, location, bucket, start, measurement, fields):
        query_template = """
        from(bucket:"{}")
            |> range(start:{})
            |> filter(fn: (r) => r["location"] == "{}")
        """.format(bucket, start, location)

        query_template += '\n |> filter(fn: (r) => r["_measurement"] == "{}"'.format(measurement[0])
        if len(measurement) > 1:
            for measure in measurement[1:]:
                query_template += ' or r["_measurement"] == "{}"'.format(measure)
        query_template += ")"

        # Looping the fields
        query_template += '\n |> filter(fn: (r) => r["_field"] == "{}"'.format(fields[0])
        if len(fields) > 1:
            for field in fields[1:]:
                query_template += ' or r["_field"] == "{}"'.format(field)
        query_template += ")"

        print(query_template)
        return query_template

    def __process_audio_data(self, data):
        result = []
        try:
            for index, table in enumerate(data):
                for record in table.records:
                    result.append({"channel": index, "time": record["_time"].strftime("%H:%M:%S"), "value": record["_value"]})
        except Exception as e:
            print(str(e))
        return result

    def __process_humidity_data(self, data):
        result = []
        try:
            for index, table in enumerate(data):
                for record in table.records:
                    result.append({"measurement": record["_measurement"], "time": record["_time"].strftime("%H:%M:%S"), "value": record["_value"]})
        except Exception as e:
            print(str(e))
        return result

    def query_audio(self, location, bucket="audio_features", start="-13h", measurement=["dBA"], fields=["1", "2", "3", "4"]):
        query = self.__create_query(location, bucket, start, measurement, fields)
        response = self.__query(query)
        result = self.__process_audio_data(response)
        return result

    def query_humidity(self, location, bucket="temp_hum_light", start="-2m", measurement=["humidity", "temperature"], fields=["celcius", "rel_humidity"]):
        query = self.__create_query(location, bucket, start, measurement, fields)
        response = self.__query(query)
        result = self.__process_humidity_data(response)
        return result
