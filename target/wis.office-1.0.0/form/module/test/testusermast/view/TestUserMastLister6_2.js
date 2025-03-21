Ext.define('module.test.testusermast.view.TestUserMastLister6_2', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister6_2',

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
		a.id = 'test_chart6_2';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load('current', {
				'packages' : [ 'timeline' ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {
		var container = document.getElementById('test_chart6_2');
		var chart = new google.visualization.Timeline(container);
		var dataTable = new google.visualization.DataTable();

		dataTable.addColumn({
			type : 'string',
			id : 'Role'
		});
		dataTable.addColumn({
			type : 'string',
			id : 'Name'
		});
		dataTable.addColumn({
			type : 'date',
			id : 'Start'
		});
		dataTable.addColumn({
			type : 'date',
			id : 'End'
		});
		dataTable.addRows([
				[ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ]
			,	[ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ]
			,	[ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ]
		]);

		var options = {
			timeline : {
				groupByRowLabel : false
			}
		};

		chart.draw(dataTable, options);
	}
});
