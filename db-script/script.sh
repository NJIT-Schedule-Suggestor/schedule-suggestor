#!/bin/bash

python3 coursesParser.py

mv ~/Downloads/*.csv ~/Desktop/csv-files/

python3 mysqlScript.py

rm -rf csv-files/*
