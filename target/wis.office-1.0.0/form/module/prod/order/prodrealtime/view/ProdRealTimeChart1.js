Ext.define('module.prod.order.prodrealtime.view.ProdRealTimeChart1', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-prodrealtime-chart1',
	store		: 'module.prod.order.prodrealtime.store.ProdRealTime1',
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},

	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			height	: 630,
			layout	: 'fit'
		});
		a.id='chart_div1';
		console.log(document.getElementById('chart_div1'));
		google.charts.load('current', {packages: ['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart:function() {
		console.log("div1 : "+document.getElementById('chart_div1'));
		console.log($('#chart_div1'));
		var store = Ext.ComponentQuery.query('module-prodrealtime-lister1')[0].getStore();

		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '수량', { role: 'style' } ]);
			var color = ['color:lightgray','color: #76A7FA','opacity: 0.2','stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF','stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'];
			var chartdata =[];
			var j = 0;
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.cstm_name);
				temp.push(store.data.items[i].data.day_qntt);
				if(j>5){
					j=0;
				}
				temp.push(color[j]);
				j++;
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);

			var options = {
				title: '거래처별 생산현황',
				hAxis: {
					title: '거래처명',
					format : 'decimal',
					viewWindow: {
						min: [7, 30, 0],
						max: [17, 30, 0]
					},
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					gridlines:{color: 'black'}
				},
				vAxis: {
					title: '금일생산수량',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
				},
				backgroundColor: '#fff',
				tooltip : {
					isHtml : true
				}
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
				chart.draw(chartdata, options);
		});
	}
});