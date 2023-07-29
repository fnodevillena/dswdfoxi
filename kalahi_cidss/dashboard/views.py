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

    sheet_data["count"] = 1
    projects_count = len(sheet_data)
    fp_count = sheet_data[sheet_data['Final_Physical_Status'] == 'Completed'].shape[0]

    # Create a groupby object based on 'main_category' and 'subcategory'
    grouped_df = sheet_data.groupby(['Major_Category', 'Project_Type']).size().reset_index(name='count')

    #groupby date
    sd_back = sheet_data.dropna(subset=['Final_Date_Of_Completion'])

    sd_back['Final_Date_Of_Completion'] = pd.to_datetime(sheet_data['Final_Date_Of_Completion'])

    sd_back['month'] = sd_back['Final_Date_Of_Completion'].dt.month
    sd_back['year'] = sd_back['Final_Date_Of_Completion'].dt.year

    
    date_group = sd_back.groupby(['year', 'month']).size().reset_index(name='count')
    date_group['month_year'] = pd.to_datetime(date_group[['year', 'month']].assign(day=1))


    #PROJECTS CARD VISUAL
    projects = go.Figure()

    projects.add_trace(go.Indicator(
    value = projects_count,
    title = {"text": "Projects"}))

    # Convert the Plotly figure to JSON to pass it to the template
    projects_graph_json = projects.to_json()
    
    #FINISHED PROJECTS CARD VISUAL
    fp = go.Figure()

    fp.add_trace(go.Indicator(
    value = fp_count,
    title = {"text": "Finished Projects"}))

    # Convert the Plotly figure to JSON to pass it to the template
    fp_graph_json = fp.to_json()

    #COMPLETION RATE
    cr = go.Figure()

    cr.add_trace(go.Indicator(
    value = (fp_count/projects_count) * 100,
    number = {"suffix": "%"},
    title = {"text": "Completion Rate"}))

    # Convert the Plotly figure to JSON to pass it to the template
    cr_graph_json = cr.to_json()

    #PROJECTS BY FUND SOURCE

    fund_source = px.histogram(sheet_data, x="Fund_Source", title="Projects by Fund Source")
    # Convert the Plotly figure to JSON to pass it to the template
    fs_graph_json = json.dumps(fund_source, cls=plotly.utils.PlotlyJSONEncoder)

    #PROJECTS BY PROVINCE

    province_proj = px.histogram(sheet_data, x="Final_Physical_Status", title="Projects by Province", 
                                 facet_col =  "Province", color = "Final_Physical_Status", labels={"Province": ""})
    # Convert the Plotly figure to JSON to pass it to the template
    prov_graph_json = json.dumps(province_proj, cls=plotly.utils.PlotlyJSONEncoder)


    #PROJECTS BY MAIN CATEGORY AND PROJECT TYPE
    
    cat_proj = px.treemap(grouped_df, path=[px.Constant("Major_Category"), "Major_Category", 'Project_Type'], 
                  values =  'count',
                  color = 'count',
                  color_continuous_scale='RdBu',
                  )
    cat_proj.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    # Convert the Plotly figure to JSON to pass it to the template
    cat_proj_graph_json = json.dumps(cat_proj, cls=plotly.utils.PlotlyJSONEncoder)

    #PROJECT TREND

    # Create figure

    proj_date = go.Figure()

    proj_date.add_trace(
        go.Scatter(x= date_group['month_year'], y = date_group['count'])
    )

    # Set title
    proj_date.update_layout(
        title_text="PROJECT TREND"
    )

    # Add range slider
    proj_date.update_layout(
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=1,
                        label="1m",
                        step="month",
                        stepmode="backward"),
                    dict(count=4,
                        label="6m",
                        step="month",
                        stepmode="backward"),
                    dict(count=1,
                        label="YTD",
                        step="year",
                        stepmode="todate"),
                    dict(count=1,
                        label="1y",
                        step="year",
                        stepmode="backward"),
                    dict(step="all")
                ])
            ),
            rangeslider=dict(
                visible=True
            ),
            type="date"
        )
    )

    #convert to json
    proj_date_json = proj_date.to_json()

    return render(request, 'dashboard/dashboard.html', {'projects_graph_json': projects_graph_json,
                                                          'fp_graph_json': fp_graph_json, 
                                                          "cr_graph_json" : cr_graph_json, 
                                                          "fs_graph_json": fs_graph_json, 
                                                          "prov_graph_json": prov_graph_json,
                                                          "cat_proj_graph_json": cat_proj_graph_json,
                                                          "proj_date_json": proj_date_json})
