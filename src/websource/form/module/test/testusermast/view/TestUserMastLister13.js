Ext.define('module.test.testusermast.view.TestUserMastLister13', {
	extend : 'Axt.form.Panel',
	alias : 'widget.module-testusermast-lister13',

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
		a.id = 'test_chart13';

		return a;
	},
	listeners : {
		render : function() {
			var me = this;
			google.charts.load('current', {'packages':['gantt']});

			google.charts.setOnLoadCallback(me.drawChart);
		}
	},
	drawChart : function() {
		var otherData = new google.visualization.DataTable();
		otherData.addColumn("string", "Task ID");
		otherData.addColumn("string", "Task Name");
		otherData.addColumn("string", "Resource");
		otherData.addColumn("date", "Start");
		otherData.addColumn("date", "End");
		otherData.addColumn("number", "Duration");
		otherData.addColumn("number", "Percent Complete");
		otherData.addColumn("string", "Dependencies");

		otherData.addRows([ [ "toTrain", "전철역으로 이동", "walk", null, null, (5 * 60 * 1000), 100, null, ], [ "music", "음악 듣기", "music", null, null, (70 * 60 * 1000), 100, null, ], [ "wait", "승차 대기", "wait", null, null, (10 * 60 * 1000), 100, "toTrain", ],
				[ "train", "전철 이동", "train", null, null, (45 * 60 * 1000), 75, "wait", ], [ "toWork", "회사로 이동", "walk", null, null, (10 * 60 * 1000), 0, "train", ], [ "work", "업무시작", null, null, null, (2 * 60 * 1000), 0, "toWork", ], ]);

		var options = {
			height : 275,
			gantt : {
				criticalPathEnabled : false, // Critical path arrows will be the same as other arrows.
				arrow : {
					angle : 100,
					width : 5,
					color : 'green',
					radius : 0
				}
			}
		};

		var chart = new google.visualization.Gantt(document.getElementById("test_chart13"));

		chart.draw(otherData, options);
	},

});
