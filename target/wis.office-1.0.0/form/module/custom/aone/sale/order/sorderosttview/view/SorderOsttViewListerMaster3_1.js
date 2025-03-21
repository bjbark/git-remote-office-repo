Ext.define('module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster3_1', { extend: 'Axt.form.Panel',

	alias: 'widget.module-sorderosttview-lister-master3_1',


	initComponent : function() {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem : function() {
		var me = this, a = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			height : 800,
		});
		a.id = 'aoneosttview3';
		google.charts.load('current', {
			'packages' : [ 'corechart' ]
		});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart : function() {

		var store = Ext.getStore('module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster3');

		store.on("datachanged", function(){

			var data = [];
			var chartdata =[];

			data.push(['영업담당', '비율']);

			store.each(function(records){
				var temp = [];
				temp.push(records.get('drtr_name'));
				temp.push(records.get('ostt_qntt'));
				data.push(temp);
			})
			chartdata = google.visualization.arrayToDataTable(data);
			console.log(chartdata);
			var options = {
				title : '영업담당별 점유율',
				tooltip		: {isHtml: true },
				pieSliceText: 'none',
		        legend: {
		            position: 'labeled'
		        }
			};

			var chart = new google.visualization.PieChart(document.getElementById('aoneosttview3'));
			chart.draw(chartdata, options);
		});
	},
	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					store = Ext.getStore('module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster3')
				;
				document.getElementById("aoneosttview3").style.height = me.lastBox.height;
				document.getElementById("aoneosttview3").style.width = me.lastBox.width;
				var data = [];
				var chartdata =[];

				data.push(['영업담당', '비율']);

				store.each(function(records){
					var temp = [];
					temp.push(records.get('drtr_name') );
					temp.push(records.get('ostt_qntt'));
					data.push(temp);
				})
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					title : '영업담당별 점유율'
				};

				var chart = new google.visualization.PieChart(document.getElementById('aoneosttview3'));
				chart.draw(chartdata, options);
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});