Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Chart3', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport11-chart3',
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReportChart113',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height : 430,
				width  : 900,
			});
		a.id = 'chart11_div3';

		google.charts.load("current", {packages:['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},

	drawChart:function() {
		var store = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart113');

			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '금액', { type: 'string', role: 'tooltip'} ]);
				var color = ['blue'];
				var chartdata =[];
				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.mm);
					temp.push(parseFloat(store.data.items[i].data.amnt));
					temp.push(store.data.items[i].data.mm+'월 금액 : '+Ext.util.Format.number(parseFloat(store.data.items[i].data.amnt), '0,000'));
					data.push(temp);
				}
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					hAxis: {
						title: '월',
						format : 'none',
						titleTextStyle:{color:'black'},
						textStyle:{ color: 'black'},
						gridlines:{ color: 'black'}
					},
					vAxis: {
						title: '금액',
						format : 'decimal',
						titleTextStyle:{color:'black'},
						textStyle:{ color: 'black'},
					},
					backgroundColor: '#fff',
					tooltip : {
						isHtml : true
					},
					bar : {
						groupWidth : '40%' // 예제에서 이 값을 수정
					}
				};
				var chart = new google.visualization.ColumnChart(document.getElementById('chart11_div3'));
				chart.draw(chartdata, options);
			});
	},

	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
				document.getElementById("chart11_div3").style.height = me.lastBox.height
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});