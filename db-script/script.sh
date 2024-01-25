#!/bin/bash

python3 coursesParser.py

mv /home/cs288/Downloads/*.csv csv-files/

python3 mysqlScript.py

rm -rf csv-files/*
