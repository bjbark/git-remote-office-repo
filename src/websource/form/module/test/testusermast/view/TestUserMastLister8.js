Ext.define('module.test.testusermast.view.TestUserMastLister8', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister8',

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
		a.id = 'test_chart8';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load('current', {
				'packages' : [ 'corechart' ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {
		var data = google.visualization.arrayToDataTable([ [ '월', 20, 28, 38, 45 ], [ '화', 31, 38, 55, 66 ], [ '수', 50, 55, 77, 80 ], [ '목', 77, 77, 66, 50 ], [ '금', 68, 66, 22, 15 ]
		// Treat first row as data as well.
		], true);

		var options = {
			legend : 'none'
		};

		var chart = new google.visualization.CandlestickChart(document.getElementById('test_chart8'));

		chart.draw(data, options);
	}
});
