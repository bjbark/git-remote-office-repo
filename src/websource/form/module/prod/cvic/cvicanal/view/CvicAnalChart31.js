Ext.define('module.prod.cvic.cvicanal.view.CvicAnalChart31', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-cvicanal-chart31',
	store		: 'module.prod.cvic.cvicanal.store.CvicChart5',
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
		a.id='chart_div5';
		google.charts.load('current', {packages: ['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart:function() {
		var store = Ext.getStore('module.prod.cvic.cvicanal.store.CvicChart5');

		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '유실시간', { role: 'style' } ]);
			var color = ['color:lightgray','color: #76A7FA','opacity: 0.2','stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF','stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'];
			var chartdata =[];
			var j = 0;
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.loss_resn_name);
				temp.push(store.data.items[i].data.loss_time);
				if(j>5){
					j=0;
				}
				temp.push(color[j]);
				j++;
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);
			console.log(chartdata);
			var options = {
				title: '원인별 비가동현황',
				hAxis: {
					title: '비가동원인',
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
					title: '유실시간',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					minValue: 0
				},
				backgroundColor: '#fff',
				tooltip : {
					isHtml : true
				}
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('chart_div5'));
				chart.draw(chartdata, options);
		});
	}
});