Ext.define('module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster1_1', {
	extend : 'Axt.form.Panel',
	alias: 'widget.module-sorderosttview-lister-master1_1',
	store: 'module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster1_1',


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
		a.id = 'osttview1';
		google.charts.load('current', {
			'packages' : [ 'corechart' ]
		});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart : function() {

		var store = Ext.getStore('module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster1');

		store.on("datachanged", function(){

			var data = [];
			var chartdata =[];

			data.push(['거래처명', '비율']);

			store.each(function(records){
				var temp = [];
				temp.push(records.get('cstm_name') );
				temp.push(records.get('ostt_qntt'));
				data.push(temp);
			})
			console.log(data);
			chartdata = google.visualization.arrayToDataTable(data);
			var options = {
				title : '거래처별 점유율',
				tooltip		: {isHtml: true }
			};
			var chart = new google.visualization.PieChart(document.getElementById('osttview1'));
			chart.draw(chartdata, options);
		});
	},
	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					store = Ext.getStore('module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster1')
				;
				document.getElementById("osttview1").style.height = me.lastBox.height;
				document.getElementById("osttview1").style.width = me.lastBox.width;
				var data = [];
				var chartdata =[];

				data.push(['거래처명', '비율']);

				store.each(function(records){
					var temp = [];
					temp.push(records.get('cstm_name') );
					temp.push(records.get('ostt_qntt'));
					data.push(temp);
				})
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					title : '거래처별 점유율'
				};

				var chart = new google.visualization.PieChart(document.getElementById('osttview1'));
				chart.draw(chartdata, options);
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});
