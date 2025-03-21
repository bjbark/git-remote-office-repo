Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Chart2', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport13-chart2',
	store		: 'module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2',

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
		a.id = 'chart13_div2';

		google.charts.load("current", {packages:['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;

	},

	drawChart:function() {
		var me = this;
		var store = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2');

		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '계획',{type: 'string', role: 'tooltip'},'실적',{type: 'string', role: 'tooltip'}]);
			var color = ['red', 'blue'];
			var chartdata =[];
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.name);
				temp.push(parseFloat(store.data.items[i].data.data1));
				temp.push(store.data.items[i].data.name+'월 계획 : '+parseFloat(store.data.items[i].data.data1));
				temp.push(parseFloat(store.data.items[i].data.data2));
				temp.push(store.data.items[i].data.name+'월 실적 : '+parseFloat(store.data.items[i].data.data2));
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);
		var options = {
				hAxis: {
					title: '월',
					format : 'decimal',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					gridlines:{color: 'black'}
				},
				vAxis: {
					title: '금액',
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
			if(document.getElementById('chart13_div2')){
				var chart = new google.visualization.ColumnChart(document.getElementById('chart13_div2'));
				chart.draw(chartdata, options);
			}
		});

	},

	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					lister	= Ext.ComponentQuery.query('module-eisreport13-lister2')[0],
					select	= lister.getSelectionModel().getSelection()[0],
					store = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart2')
				;
				document.getElementById("chart13_div2").style.height = me.lastBox.height;
				document.getElementById("chart13_div2").style.width = me.lastBox.width;
				google.charts.setOnLoadCallback(me.drawChart);
				if(select){
					store.reload();
				}
			}
		}
	},
});