Ext.define('module.test.testusermast.view.TestUserMastLister7', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister7',

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
		a.id = 'test_chart7';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load('current', {
				'packages' : [ 'gauge' ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {
		var data = google.visualization.arrayToDataTable([ [ 'Label', 'Value' ], [ 'Memory', 80 ], [ 'CPU', 55 ], [ 'Network', 68 ] ]);

		var options = {
			width : 1000,
			height : 400,
			redFrom : 90,
			redTo : 100,
			yellowFrom : 75,
			yellowTo : 90,
			minorTicks : 5
		};

		var chart = new google.visualization.Gauge(document.getElementById('test_chart7'));

		chart.draw(data, options);

		setInterval(function() {
			data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
			chart.draw(data, options);
		}, 3000);
		setInterval(function() {
			data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
			chart.draw(data, options);
		}, 5000);
		setInterval(function() {
			data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
			chart.draw(data, options);
		}, 5000);
	}
});
