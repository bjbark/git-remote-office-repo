<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta charset="UTF-8">
  <title>Gauge Chart</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans:400,700'>
<link rel="stylesheet" href="/resource/js/gauge-chart/dist/style.css">
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script>
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMultSeries);
google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);
function drawMultSeries() {
	// 막대 2개 그래프
//       var data = new google.visualization.DataTable();
//       data.addColumn('timeofday', 'Time of Day');
//       data.addColumn('number', 'Motivation Level');
//       data.addColumn('number', 'Energy Level');

//       data.addRows([
//         [{v: [8, 0, 0], f: '8 am'}, 1, .25],
//         [{v: [9, 0, 0], f: '9 am'}, 2, .5],
//         [{v: [10, 0, 0], f:'10 am'}, 3, 1],
//         [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
//         [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
//         [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
//         [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
//         [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
//         [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
//         [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
//       ]);
	//막대 1개 그래프
		var data = google.visualization.arrayToDataTable([
			['Year', 'Visitations', { role: 'style' } ],
	        ['2010', 10, 'color: lightgray'],
	        ['2020', 14, 'color: #76A7FA'],
	        ['2030', 16, 'opacity: 0.2'],
	        ['2040', 22, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
	        ['2050', 28, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
		]);

      var options = {
        title: 'Motivation and Energy Level Throughout the Day',
        hAxis: {
			title: 'Time of Day',
			format: 'h:mm a',
			viewWindow: {
				min: [7, 30, 0],
				max: [17, 30, 0]
			},
			titleTextStyle:{ color:'white'},
			textStyle:{ color: 'white'},
			gridlines:{color: 'white'}
        },
        vAxis: {
          title: 'Rating (scale of 1-10)',
          titleTextStyle:{ color:'white'},
          textStyle:{ color: 'white'},
        },
        backgroundColor: 'gray',


      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }
function drawChart() {

	var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Dogs');
    data.addColumn('number', 'Cats');

    data.addRows([
      [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
      [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
      [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
      [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
      [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
      [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
      [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
      [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
      [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
      [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
      [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
      [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
    ]);

    var options = {
		hAxis: {
			title: 'Time',
			titleTextStyle:{ color:'white'},
			textStyle:{ color: 'white'},
			gridlines:{color: 'white'}
        },
        vAxis: {
			title: 'Popularity',
			titleTextStyle:{ color:'white'},
			textStyle:{ color: 'white'},

        },
        legendTextStyle: { color: '#FFF' },
        backgroundColor: 'gray',
        colors: ['#a52714', '#097138'],
        height:450,
    };

    var chart = new google.charts.Line(document.getElementById('line_top_x'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
</script>
<style>
	*{
		margin: 0;padding: 0;
	}
	#graph_table{
		width:100%;
		height: 100%
	}
	#testGauge{
	  float:right;
	  width: 100%;
	  background-color: gray;
	}
	td{
		border:1px solid black;
	}
	 li a{
	 	margin:10px 0;
		height: 200px;
		border: 1px solid white;
		background-color: gray;
		color: white;
		font-size: 5em;
		line-height: 200px;
	}
</style>
</head>
<body>
<div class="container-fluid"style="background-color: lightgray;">
  <div class="row-fluid">
    <div class="col-md-2" style="height: 100%">
		<ul class="nav nav-sidebar">
			<li>
				<a href="#">1</a>
			</li>
		</ul>
		<ul class="nav nav-sidebar">
			<li>
				<a href="#">2</a>
			</li>
		</ul>
		<ul class="nav nav-sidebar">
			<li>
				<a href="#">3</a>
			</li>
		</ul>
		<ul class="nav nav-sidebar">
			<li>
				<a href="#">4</a>
			</li>
		</ul>
    </div>
    <div class="col-md-10" style="background-color: gray;">
    	<div class="row">
			<div id = 'testGauge' class="col-md-10" >
				<button id="random" class="button">test Random value</button>
				<h1 class="main__title">test graph</h1>
				<div class="gauge-container">
					<div class="gauge"></div>
					<div class="gauge"></div>
					<div class="gauge"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div  class='col-md-6'>
				<div id="line_top_x"style="width: 100%; margin: 60px 0 0 20px;"></div>
			</div>
			<div class='col-md-6'>
				<div id="chart_div"style="height: 550px;"></div>
			</div>
		</div>
    </div>
  </div>
</div>


<svg width="0" height="0" version="1.1" class="gradient-mask" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <linearGradient id="gradientGauge">
        <stop class="color-red" offset="0%"/>
        <stop class="color-yellow" offset="17%"/>
        <stop class="color-green" offset="40%"/>
        <stop class="color-yellow" offset="87%"/>
        <stop class="color-red" offset="100%"/>
      </linearGradient>
  </defs>
</svg>
<!-- partial -->
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js'></script>
<script src='https://cdn3.devexpress.com/jslib/17.1.6/js/dx.all.js'></script>
<script  src="/resource/js/gauge-chart/dist/script.js"></script>

</body>
</html>