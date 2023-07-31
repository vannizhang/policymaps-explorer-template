import { IItem, ISearchResult } from '@esri/arcgis-rest-portal';

export type ContentType =
    | 'maps'
    | 'layers'
    | 'apps'
    | 'tools'
    | 'files'
    | 'webmap'
    | '';

export type SortField = 'relevance' | 'title' | 'modified';

export type SortOrder = 'asc' | 'desc';

export type SearchResponse = Omit<
    ISearchResult<IItem>,
    'nextPage' | 'aggregations'
>;

export const ContentTypeQueryStr: Record<ContentType, string> = {
    maps: '(type:("Project Package" OR "Windows Mobile Package" OR "Map Package" OR "Basemap Package" OR "Mobile Basemap Package" OR "Mobile Map Package" OR "Pro Map" OR "Project Package" OR "Web Map" OR "CityEngine Web Scene" OR "Map Document" OR "Globe Document" OR "Scene Document" OR "Published Map" OR "Explorer Map" OR "ArcPad Package" OR "Map Template") -type:("Web Mapping Application" OR "Layer Package"))',
    layers: '((type:"Scene Service" OR type:"Feature Collection" OR type:"Route Layer" OR type:"Layer" OR type:"Explorer Layer" OR type:"Tile Package" OR type:"Compact Tile Package" OR type:"Vector Tile Package" OR type:"Scene Package" OR type:"Layer Package" OR type:"Feature Service" OR type:"Stream Service" OR type:"Map Service" OR type:"Vector Tile Service" OR type:"Image Service" OR type:"WMS" OR type:"WFS" OR type:"WMTS" OR type:"KML" OR typekeywords:"OGC" OR typekeywords:"Geodata Service" OR type:"Globe Service" OR type:"CSV" OR type:"Shapefile" OR type:"GeoJson" OR type:"Service Definition" OR type:"File Geodatabase" OR type:"CAD Drawing" OR type:"Relational Database Connection") -type:("Web Mapping Application" OR "Geodata Service"))',
    apps: '(type:("Code Sample" OR "Web Mapping Application" OR "Mobile Application" OR "Application" OR "Desktop Application Template" OR "Desktop Application" OR "Operation View" OR "Dashboard" OR "Operations Dashboard Extension" OR "Workforce Project" OR "Insights Workbook" OR "Insights Page" OR "Insights Model" OR "Hub Page" OR "Hub Initiative" OR "Hub Site Application"))',
    files: '((typekeywords:"Document" OR type:"Image" OR type:"Layout" OR type:"Desktop Style" OR type:"Project Template" OR type:"Report Template" OR type:"Statistical Data Collection" OR type:"360 VR Experience" OR type:"netCDF") -type:("Map Document" OR "Image Service" OR "Explorer Document" OR "Explorer Map" OR "Globe Document" OR "Scene Document"))',
    webmap: '(type:("Web Map") -type:"Web Mapping Application")',
    tools: '((typekeywords:"tool" OR type:"Raster function template" OR type:"Geodata Service" OR type:"Workflow Manager Package" OR type:"Rule Package" OR type:"Operations Dashboard Add In" OR type:"Workflow Manager Service" OR type:"ArcGIS Pro Configuration" OR type:"Big Data Analytic" OR type:"Real Time Analytic") -type:"KML")',
    '': '',
};

export const SortOrderBySortField: Record<SortField, SortOrder> = {
    relevance: 'desc',
    modified: 'desc',
    title: 'asc',
};
