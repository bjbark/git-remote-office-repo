Ext.define('module.test.testusermast.view.TestUserMastLister11', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister11',

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
		a.id = 'test_chart11';

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
		var data = google.visualization.arrayToDataTable([
          ['년도', '매출', '매출원가'],
          ['2018',  1000,      400],
          ['2019',  1170,      460],
          ['2020',  660,       1120],
          ['2021',  1030,      540]
        ]);
		var options = {
			title : '매출 대비 원가 현황',
			curveType : 'function',
			legend : {
				position : 'bottom'
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('test_chart11'));

		chart.draw(data, options);
	}
});
