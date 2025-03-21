Ext.define('module.test.testusermast.view.TestUserMastLister3_2', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister3_2',

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
		a.id = 'test_chart3_2';

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


//		var data = google.visualization.arrayToDataTable([ [ 'Task', 'Hours per Day' ], [ 'Work', 11 ], [ 'Eat', 2 ], [ 'Commute', 2 ], [ 'Watch TV', 2 ], [ 'Sleep', 7 ] ]);
		var data = google.visualization.arrayToDataTable([ [ 'Task', 'Hours per Day' ], [ '교재', 11 ], [ '전문서적', 2 ], [ '교양', 2 ], [ '소설', 2 ], [ '고전문학', 7 ] ]);

		var options = {
//			title : 'My Daily Activities',
			title : '도서 분류별 매출 분포',
			is3D : true,
		};

		var chart = new google.visualization.PieChart(document.getElementById('test_chart3_2'));

		chart.draw(data, options);
	}
});
