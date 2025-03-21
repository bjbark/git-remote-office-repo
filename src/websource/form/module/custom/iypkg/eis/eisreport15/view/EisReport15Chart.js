Ext.define('module.custom.iypkg.eis.eisreport15.view.EisReport15Chart', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport15-chart',
	store		: 'module.custom.iypkg.eis.eisreport15.store.EisReport15Detail',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
		Ext.EventManager.onWindowResize(function(w, h){
			console.log(me);
		});
	},
	columnItem:function(){
		var me = this,
			myEl = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height	: 430,
				width	: 900,
			});
		;
		myEl.id = 'chart15';
		google.charts.load("current", {packages:['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return myEl;
	},
	drawChart:function() {
		var store = Ext.getStore('module.custom.iypkg.eis.eisreport15.store.EisReport15Detail');

			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '금액', { type: 'string', role: 'tooltip'} ]);
				var color = ['blue'];
				var chartdata =[];
				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.rnum);
					temp.push(parseFloat(store.data.items[i].data.amnt));
					temp.push(store.data.items[i].data.rnum+'월 금액 : '+Ext.util.Format.number(parseFloat(store.data.items[3].data.amnt), '0,000'));
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
				var chart = new google.visualization.ColumnChart(document.getElementById('chart15'));
				chart.draw(chartdata, options);
			});
	},

	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
				document.getElementById("chart15").style.height = me.lastBox.height
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});