import os
import numpy as np
import pandas as pd
import mysql.connector

cnx = mysql.connector.connect(
    host="dt3bgg3gu6nqye5f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com", user="n4zbrlm1065fpeh6", password="o6in4yjlk123n21b", database="cusnsdako2stshzf"
)
cursor = cnx.cursor()

csv_folder = "csv-files"

for filename in sorted(os.listdir(csv_folder)):
    if filename.endswith(".csv"):
        df = pd.read_csv(os.path.join(csv_folder, filename))
        df = df.rename(columns={"Delivery Mode": "DeliveryMode"})
        df = df.replace(np.nan, None)
        df["SecondaryTime"] = None
        df["SecondaryDays"] = None
        df["SecondaryLocation"] = None

        uniqueCrns = []
        for i in range(len(df)):
            crn = df.loc[i, "CRN"]
            if crn in uniqueCrns:
                df.loc[i-1, "SecondaryTime"] = df.loc[i, "Times"]
                df.loc[i-1, "SecondaryDays"] = df.loc[i, "Days"]
                df.loc[i-1, "SecondaryLocation"] = df.loc[i, "Location"]
                df = df.drop(i)
            else:
                uniqueCrns.append(crn)

        table_name = os.path.splitext(filename)[0].split("_")[3]
        if table_name == "AS":
            table_name = "ASS"
        elif table_name == "INT":
            table_name = "INTT"
        elif table_name == "IS":
            table_name = "ISS"
        elif table_name == "SET":
            table_name = "SETT"

        create_table_query = f'CREATE TABLE IF NOT EXISTS {table_name} ({", ".join([f"{col} varchar(255) DEFAULT NULL" for col in df.columns])}, PRIMARY KEY (CRN));'
        create_table_query = create_table_query.replace(
            "CRN varchar(255) DEFAULT NULL", "CRN varchar(255)"
        )
        create_table_query = create_table_query.replace(
            "Comments varchar(255)", "Comments varchar(512)"
        )
        print(create_table_query)
        cursor.execute(create_table_query)
        cnx.commit()

        insert_query = f'REPLACE INTO {table_name} ({", ".join(df.columns)}) VALUES ({", ".join(["%s" for _ in df.columns])})'
        print(insert_query + "\n")
        cursor.executemany(insert_query, df.values.tolist())
        cnx.commit()

cursor.close()
cnx.close()
