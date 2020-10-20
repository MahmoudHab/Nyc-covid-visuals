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

  $.get("https://raw.githubusercontent.com/nychealth/coronavirus-data/master/case-hosp-death.csv", function(data) {
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
  
  
  $.ajax({
    type: "GET",
    url:"https://raw.githubusercontent.com/nychealth/coronavirus-data/master/boro.csv",
    dataType: "text",
    success: function(data) {processData(data);}
  });
  function processData( allText ) {
		var allLinesArray = allText.split("\n");
		if( allLinesArray.length > 0 ){
			var dataPoints = [];
			for (var i = 0; i <= allLinesArray.length-1; i++) {
				var rowData = allLinesArray[i].split(",");
				dataPoints.push({ label:rowData[0], y:parseInt(rowData[1]) });
			}
			drawChart(dataPoints);
		}
	}

	function drawChart( dataPoints) {
		var chart2 = new CanvasJS.Chart("chartContainer2", {
			title: {
        text: "Boro Cases",
        fontSize: 20, 
        padding: {
          top: 10,
          bottom: 20
        }
      },
      theme: "light2",
      animationEnabled: true,
			axisX:{
				labelAngle: 0,
				labelWrap:true,
				labelAutoFit: false,
        labelFontSize: 14
			},
      axisY: {
        labelFontSize: 14,
      },
			data: [
			{
				type: "column",
				dataPoints: dataPoints
			}]
		});
		chart2.render();
	}
}