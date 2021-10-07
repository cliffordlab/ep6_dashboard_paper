from setuptools import setup

setup(
    name = "influxclient",
    version = "1.0",
    author = "Nicolas Shu",
    author_email = "nicolas.s.shu@gmail.com",
    packages = ["influxclient"],
    description = "Easier Influx Client",
    install_requires = [
        "influxdb_client",
    ]
)

