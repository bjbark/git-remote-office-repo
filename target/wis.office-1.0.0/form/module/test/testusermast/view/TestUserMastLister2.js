Ext.define('module.test.testusermast.view.TestUserMastLister2', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister2',

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
		a.id = 'test_chart2';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load("current", {
				packages : [ "corechart" ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {

		var data = google.visualization.arrayToDataTable([ [ "Element", "Density", {
			role : "style"
		} ], [ "Copper", 8.94, "#b87333" ], [ "Silver", 10.49, "silver" ], [ "Gold", 19.30, "gold" ], [ "Platinum", 21.45, "color: #e5e4e2" ] ]);

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
		var chart = new google.visualization.BarChart(document.getElementById("test_chart2"));
		chart.draw(view, options);
	}
});
