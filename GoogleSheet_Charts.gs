function onOpen(e)
{
  addMenu(); 
}

function addMenu()
{
  var menu = SpreadsheetApp.getUi().createMenu('Charts');
  menu.addItem('Bar Chart', 'BarChart');
  menu.addItem('Line Chart', 'LineChart');
  menu.addItem('Pie Chart', 'PieChart');
  menu.addToUi(); 
}

function BarChart()
{
  AddChart('Bar');
}

function LineChart()
{
  AddChart('Line');
}

function PieChart()
{
  AddChart('Pie');
}

function AddChart(type)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('SALES');
  var lastRow = sheet.getLastRow()+1;
  var charts = sheet.getCharts();

  for (var i in charts) {
    var chart = charts[i];
    sheet.removeChart(chart);
  }

  if(type == 'Line')
  {
    var chart = sheet.newChart()
      .setChartType(Charts.ChartType.LINE)
      .setOption('title', 'Sales Chart')
      .setOption('hAxis.title', 'Sales Person')
      .setOption('vAxis.title', 'US Dollars')
      .addRange(sheet.getRange("A2:B"+lastRow))
      .setPosition(2, 4, 0, 0)
      .build(); 
  }

  if(type == 'Bar')
  {
    var chart = sheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .setOption('title', 'Sales Chart')
      .setOption('vAxis.title', 'Sales Person')
      .setOption('hAxis.title', 'US Dollars')
      .addRange(sheet.getRange("A2:B"+lastRow))
      .setPosition(2, 4, 0, 0)
      .build(); 
  }

  if(type == 'Pie')
  {
    var chart = sheet.newChart()
      .setChartType(Charts.ChartType.PIE)
      .addRange(sheet.getRange("A2:B"+lastRow))
      .setOption('title', 'Sales Chart')
      .setOption('is3D', true)
      .setPosition(2, 4, 0, 0)
      .build(); 
  }

  sheet.insertChart(chart);

}