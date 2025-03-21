Ext.define('module.test.testusermast.view.TestUserMastLister', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister',

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
		a.id = 'test_chart';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load('current', {
				packages : [ 'corechart', 'bar' ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {

		var data = google.visualization.arrayToDataTable([ [ 'Year', 'Visitations', {
			role : 'style'
		} ], [ '2010', 10, 'color: gray' ], [ '2020', 14, 'color: #76A7FA' ], [ '2030', 16, 'opacity: 0.2' ], [ '2040', 22, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF' ],
				[ '2050', 28, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2' ] ]);

		var view = new google.visualization.DataView(data);
		view.setColumns([ 0, 1, {
			calc : "stringify",
			sourceColumn : 1,
			type : "string",
			role : "annotation"
		}, 2 ]);

		var options = {
			title : "Density of Precious Metals, in g/cm^3",
			width : 800,
			height : 600,
			bar : {
				groupWidth : "95%"
			},
			legend : {
				position : "none"
			},
		};
		var chart = new google.visualization.ColumnChart(document.getElementById("test_chart"));
		chart.draw(view, options);
	}
});
