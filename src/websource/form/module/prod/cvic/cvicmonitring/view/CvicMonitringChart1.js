Ext.define('module.prod.cvic.cvicmonitring.view.CvicMonitringChart1', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-cvicmonitring-chart1',
	store		: 'module.prod.cvic.cvicmonitring.store.CvicMonitringChart1',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			height : 500
		});
		a.id='chart1';
		google.charts.load('current', {packages: ['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart:function() {
		var store = Ext.getStore('module.prod.cvic.cvicmonitring.store.CvicMonitringChart1');
		var me = Ext.ComponentQuery.query('module-cvicmonitring-chart1')[0];
		var today = me.dateFormat();
		store.load({
			params : {
				param:JSON.stringify({invc_date : today})
			},
			callback : function(records,operation,success){
			}
		})
		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '가동률(%)', { role: 'style' } ]);
			var color = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];
			var chartdata =[];
			var j = 0;
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.cvic_name);
				temp.push(parseFloat(store.data.items[i].data.timesum));
				if(j>5){
					j=0;
				}
				temp.push(color[j]);
				j++;
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);
			var options = {
				title: '설비별 가동률',
				hAxis: {
					title: '설비명',
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
					title: '가동률',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					maxValue : 100,
					minValue : 0,
				},
				backgroundColor: '#fff',
				tooltip : {
					isHtml : true
				},
				bar : {
					groupWidth : '40%' // 예제에서 이 값을 수정
				}
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('chart1'));
				chart.draw(chartdata, options);
		});
	},
	dateFormat:function(){
		var date = new Date(),
			yyyy = date.getFullYear().toString(),
			mm = (date.getMonth()+1).toString(),
			dd = date.getDate().toString()
		;
		if(mm < 10){
			mm = '0'+mm;
		}
		if(dd < 10){
			dd = '0'+dd;
		}
		return yyyy+mm+dd;
	}
});
