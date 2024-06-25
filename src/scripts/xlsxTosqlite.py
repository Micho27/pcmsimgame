import sqlite3
import pandas as pd

# Connect to the SQLite database
con = sqlite3.connect('raceDays.sqlite')

# Read the Excel file (change 'my_excel_file.xlsx' to your actual file name)
wb = pd.read_excel('raceDays.xlsx', sheet_name=None)

# Iterate through each sheet in the Excel file
for sheet_name, df in wb.items():
    # Write the data from the sheet to an SQLite table
    df.to_sql(sheet_name, con, index=False, if_exists='replace')

# Commit changes and close the connection
con.commit()
con.close()