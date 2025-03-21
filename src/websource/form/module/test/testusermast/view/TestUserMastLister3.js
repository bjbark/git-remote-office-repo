Ext.define('module.test.testusermast.view.TestUserMastLister3', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister3',

	initComponent : function() {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem : function() {
		var	me = this,
			a = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height : 800,
			})
		;
		a.id = 'test_chart3';
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

		var data = google.visualization.arrayToDataTable([ [ 'Task', 'Hours per Day' ], [ '교재', 11 ], [ '전문서적', 2 ], [ '교양', 2 ], [ '소설', 2 ], [ '고전문학', 7 ] ]);

		var options = {
			title : '도서 분류별 매출 분포'
		};

		var chart = new google.visualization.PieChart(document.getElementById('test_chart3'));

		chart.draw(data, options);
	}
});
