Ext.define('module.custom.iypkg.eis.eisreport12.view.EisReport12Chart1', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport12-chart1',
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReport12Chart1',

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
		a.id = 'chart12_div1';
		google.charts.load("current", {packages:['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;

	},

	drawChart:function() {
		var store = Ext.getStore('module.custom.iypkg.eis.eisreport12.store.EisReport12Detail1');
			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '합계', { type: 'string', role: 'tooltip'} ]);
				var color = ['blue'];
				var chartdata =[];

				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.mm);
					temp.push(parseFloat(store.data.items[i].data.istt_amnt));
					temp.push(store.data.items[i].data.mm+'월 합계 : '+Ext.util.Format.number(parseFloat(store.data.items[3].data.istt_amnt), '0,000'));
					data.push(temp);
				}
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					hAxis: {
						title: '월',
						format : 'none',
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
						gridlines:{ color: 'black'}
					},
					vAxis: {
						title: '합계',
						format : 'decimal',
						titleTextStyle:{ color:'black'},
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
				var chart = new google.visualization.ColumnChart(document.getElementById('chart12_div1'));
				chart.draw(chartdata, options);
			});
	},

	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
				document.getElementById("chart12_div1").style.height = me.lastBox.height
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});