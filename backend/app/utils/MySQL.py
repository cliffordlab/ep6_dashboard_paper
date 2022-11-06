import logging
import mysql.connector


class MySQL(object):

    def __init__(self, host, port=3306) -> None:
        self.__hostname = host
        self.__port = port
        self.__username = "root"
        self.__password = "rs@648"
        try:
            self.__cnxn = mysql.connector.connect(self.__hostname, self.__port, user=self.__username, password=self.__password)
            self.__cursor = self.__cnxn.cursor()
        except Exception as e:
            logging.exception("Error Occurred in creating MySQL - {}".format(str(e)), exc_info=True)

    def query(self, query):
        try:
            self.__cursor.execute(query)

        except Exception as e:
            logging.exception("Error occurred while executing the query - {}".format(str(e)), exc_info=True)
