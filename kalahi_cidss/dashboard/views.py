from django.shortcuts import render
from django.http import HttpResponse
import plotly.graph_objects as go
import plotly.express as px
import plotly 
import pandas as pd
import numpy as np
import os
import json
from django.conf import settings


def dashboard(request):
    context = {'active_page': 'dashboard'}
    
    return render(request, "dashboard/dashboard.html", context)


def access_data(request):

    file_path = os.path.join(settings.STATICFILES_DIRS[0], 'data', 'SPI Masterlist as of 2023.07.15 ALL.xlsx')

    # Read all sheets into a dictionary where the keys are sheet names and values are DataFrames
    sheets_dict = pd.read_excel(file_path, sheet_name=None)

    # Access individual sheets by sheet name
    sheet_name = 'SPI Masterlist with BTF (Raw)'
    sheet_data = sheets_dict[sheet_name]

    #PROJECTS CARD VISUAL
    projects = go.Figure()

    projects.add_trace(go.Indicator(
    value = len(sheet_data),
    title = {"text": "Projects"}))

    # Convert the Plotly figure to JSON to pass it to the template
    projects_graph_json = projects.to_json()
    
    #FINISHED PROJECTS CARD VISUAL
    fp = go.Figure()

    fp.add_trace(go.Indicator(
    value = sheet_data[sheet_data['Final_Physical_Status'] == 'Completed'].shape[0],
    title = {"text": "Finished Projects"}))

    # Convert the Plotly figure to JSON to pass it to the template
    fp_graph_json = fp.to_json()

    #COMPLETION RATE
    cr = go.Figure()

    cr.add_trace(go.Indicator(
    value = ((sheet_data[sheet_data['Final_Physical_Status'] == 'Completed'].shape[0]) / len(sheet_data)) * 100,
    number = {"suffix": "%"},
    title = {"text": "Completion Rate"}))

    # Convert the Plotly figure to JSON to pass it to the template
    cr_graph_json = cr.to_json()

    #PROJECTS BY FUND SOURCE

    fund_source = px.histogram(sheet_data, x="Fund_Source", title="Projects by Fund Source")
    # Convert the Plotly figure to JSON to pass it to the template
    fs__graph_json = json.dumps(fund_source, cls=plotly.utils.PlotlyJSONEncoder)

    return render(request, 'dashboard/dashboard.html', {'projects_graph_json': projects_graph_json,
                                                          'fp_graph_json': fp_graph_json, "cr_graph_json" : cr_graph_json, "fs_graph_json": fs__graph_json})
