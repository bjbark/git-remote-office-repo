Ext.define('module.custom.komec.eis.eisreport.view.EisReportLister4', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-komec-eisreport-lister4',

	initComponent : function() {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem : function() {
		var me = this, a = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			height : 600,
		});
		a.id = 'test_chart11';
		google.charts.load('current', {
			'packages' : [ 'corechart' ]
		});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart : function() {

		var store = Ext.getStore('module.custom.komec.eis.eisreport.store.EisReportGraph');
		store.on("datachanged", function(){
			var data = [];
			var chartdata =[];

			data.push( ['일시', '온도', 'RPM']);

//			store.each(function(records){
//				var temp = [];
//				temp.push(records.get('dttm') );
//				temp.push(records.get('temperature') );
//				temp.push(records.get('rpm'));
//				data.push(temp);
//			})

			store.each(function (record) {
				var temperature = record.get('temperature');
				// 데이터가 0보다 큰 경우에만 그래프에 추가
				if (temperature > 0) {
					var temp = [
						record.get('dttm'),
						record.get('temperature'),
						record.get('rpm')
					];
					data.push(temp);
				} else {
					// 데이터가 0인 경우 그래프를 끊기 위해 null 값을 추가
					chartdata.push(null);
				}
			});
			var chartdata = google.visualization.arrayToDataTable(data);

			var options = {
				curveType : 'function',
				legend : {
					position : 'bottom'
				}
			};

			var chart = new google.visualization.LineChart(document.getElementById('test_chart11'));

			chart.draw(chartdata, options);
		});
	}
});
