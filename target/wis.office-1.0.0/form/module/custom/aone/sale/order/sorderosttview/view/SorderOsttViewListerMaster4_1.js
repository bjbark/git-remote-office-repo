Ext.define('module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster4_1', { extend: 'Axt.form.Panel',

	alias: 'widget.module-sorderosttview-lister-master4_1',

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
		a.id = 'aoneosttview4';
		google.charts.load('current', {
			'packages' : [ 'corechart' ]
		});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart : function() {

		var store = Ext.getStore('module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster4');

		store.on("datachanged", function(){

			var data = [];
			var chartdata =[];

			data.push(['엔지니어', '비율']);

			store.each(function(records){
				var temp = [];
				temp.push(records.get('user_name'));
				temp.push(records.get('ostt_qntt'));
				data.push(temp);
			})
			chartdata = google.visualization.arrayToDataTable(data);
			console.log(chartdata);
			var options = {
				title : '엔지니어별 점유율',
				tooltip		: {isHtml: true },
				pieSliceText: 'none',
		        legend: {
		            position: 'labeled'
		        }
			};

			var chart = new google.visualization.PieChart(document.getElementById('aoneosttview4'));
			chart.draw(chartdata, options);
		});
	},
	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					store = Ext.getStore('module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster4')
				;
				document.getElementById("aoneosttview4").style.height = me.lastBox.height;
				document.getElementById("aoneosttview4").style.width = me.lastBox.width;
				var data = [];
				var chartdata =[];

				data.push(['엔지니어', '비율']);

				store.each(function(records){
					var temp = [];
					temp.push(records.get('user_name') );
					temp.push(records.get('ostt_qntt'));
					data.push(temp);
				})
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					title : '엔지니어별 점유율'
				};

				var chart = new google.visualization.PieChart(document.getElementById('aoneosttview4'));
				chart.draw(chartdata, options);
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});
