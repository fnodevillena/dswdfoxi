from django.db import models
import pandas as pd
import os


# Create your models here.
def access_excel () :

    file_path = os.path.join(settings.STATICFILES_DIRS[0], 'data', 'SPI Masterlist as of 2023.07.15 ALL.xlsx')

    # Read all sheets into a dictionary where the keys are sheet names and values are DataFrames
    sheets_dict = pd.read_excel(file_path, sheet_name=None)

    # Access individual sheets by sheet name
    sheet_name = 'SPI Masterlist with BTF (Raw)'
    sheet_data = sheets_dict[sheet_name]

    sheet_data["count"] = 1
    projects_count = len(sheet_data)
    fp_count = sheet_data[sheet_data['Final_Physical_Status'] == 'Completed'].shape[0]

    status_mapping = {
    'Completed': 'Finished',
    }

    # Creating a new column "Project Status Binary" using the map function
    sheet_data['Project_Status_Binary'] = sheet_data['Final_Physical_Status'].map(status_mapping).fillna('Unfinished') 