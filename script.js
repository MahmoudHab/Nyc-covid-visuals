window.onload = function() {
  var dataPoints0 = [];
  function getDataPointsFromCSV(csv, field) { // add this second parameter
    var dataPoints0 = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);         

    for (var i = 0; i < csvLines.length; i++)
      if (csvLines[i].length > 0) {
        points = csvLines[i].split(",");
        dataPoints0.push({ 
          x: new Date(points[0]), 
          y: parseFloat(points[field])  // use the parameter to decide which field to push
        });
      }
    return dataPoints0;
    // return dataPoints1; - remove this line, as the line before it stops it working
  }

  $.get("https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/now-hosp-by-day.csv", function(data) {
    var chart1 = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "NYC COVID-19 DATA",
        fontSize: 20, 
        padding: {
          top: 10,
          bottom: 20
        }
      },
      theme: "light2",
      animationEnabled: true,
      zoomEnabled: true,
      axisX:{
        valueFormatString: "M/D",
        labelFontSize: 12,
      },
      axisY: {
        labelFontSize: 14,
      },
      toolTip:{
        shared: true
      },
      legend:{
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "center",
        dockInsidePlotArea: false,
        fontSize: 15
      },
      data: [{
        xValueFormatString: "MM/DD/YY",
        type: "line",
        name: "New Cases",
        showInLegend: true,
        dataPoints: getDataPointsFromCSV(data,1),
        backgroundColor: "rgba(153,255,51,0.4)"
      },{
        xValueFormatString: "MM/DD/YY",
        type: "line",
        name: "Hospitalized",
        showInLegend: true,
        dataPoints: getDataPointsFromCSV(data,2),
        backgroundColor: "rgba(153,132,51,0.4)"
      },{
        xValueFormatString: "MM/DD/YY",
        type: "line",
        name: "New Deaths",
        showInLegend: true,
        dataPoints: getDataPointsFromCSV(data,3),
        backgroundColor: "rgba(255,153,0,0.4)"
      }]
    });

    chart1.render();

  });
  
  
}