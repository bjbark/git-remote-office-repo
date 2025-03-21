Ext.define('module.test.testusermast.view.TestUserMastLister10', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister10',

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
		a.id = 'test_chart10';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load('current', {
				'packages' : [ 'geochart' ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {
		var data = google.visualization.arrayToDataTable([
			['Country', 'Popularity'],
			['Germany', 200],
			['United States', 300],
			['Brazil', 400],
			['Canada', 500],
			['France', 600],
			['Korea', 600],
			['RU', 700]
		]);
		var options = {};

		var chart = new google.visualization.GeoChart(document.getElementById('test_chart10'));

		chart.draw(data, options);
	}
});
