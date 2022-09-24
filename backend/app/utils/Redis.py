"""
  Author : Ratan Singh
  Email : [ratansingh648@gmail.com]
  Date Created : 2022-09-24 20:10:33
  Last Modified : 2021-09-24 20:10:33
  Description : Redis Client to store and fetch the data
"""

import logging
from typing_extensions import assert_type
from redis import Redis
from time import time


class Redis(object):

    def __init__(self, host="localhost", port=6739) -> None:
        """
        Initializing the redis client for connection
        """
        self.__hostname = host
        self.__port = port

        # try establishing the connection with the server
        try:
            self.__redis = Redis(host=self.__hostname, port=self.__port)
        except Exception as e:
            logging.error("Exception occurred in initializing the instance of redis client on {}:{}".format(host, port), exc_info=True)
            print("Failed creating Redis Client. Check if connection is active on {}:{}".format(host, port))

    def set_value(self, key, value, expiry_seconds=None) -> None:
        """
        setting a primitive value like number or string in redis
        """
        try:
            self.__redis.set(key, value, ex=expiry_seconds)
        except Exception as e:
            logging.error("Failed to store key : {}".format(key), exc_info=True)
            print("Exception occurred in storing the key : {}".format(key))

    def get_value(self, key):
        """
        Getting the primitive value stored in the redis
        """
        try:
            value_ = self.__redis.get(key)
        except Exception as e:
            value_ = None
            logging.error("Failed to retrieve key : {}".format(key), exc_info=True)
            print("Exception occurred in retrieving the key : {}".format(key))
        finally:
            return value_

    def set_image(self, key, image_path, expiry_seconds=None) -> None:
        """
        Method to serialize and store the images in redis
        """
        try:
            byte_code_ = open(image_path, "rb").read()
            self.__redis.set(key, byte_code_, ex=expiry_seconds)
        except Exception as e:
            logging.error("Failed to store image : {}".format(key), exc_info=True)
            print("Exception occurred in storing the image : {}".format(key))

    def get_image(self, key, path) -> None:
        """
        Method to retrieve an image and store it on the path
        """
        try:
            byte_code_ = self.__redis.get(key)
            fileHandle = open(path, "wb")
            fileHandle.write(byte_code_)
            fileHandle.close()
        except Exception as e:
            logging.error("Failed to retrieve image : {}".format(key), exc_info=True)
            print("Exception occurred in retrieving the image : {}".format(key))
