Ext.define('module.prod.order.prodrealtime.view.ProdRealTimeChart3', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-prodrealtime-chart3',
	store		: 'module.prod.order.prodrealtime.store.ProdRealTime1',
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var me = this,
			myEl = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height	: 630,
				layout	: 'fit',});
		;
		myEl.id = 'columnchart_values';
		google.charts.load("current", {packages:['corechart']});
		google.charts.setOnLoadCallback(me.drawChart);

		return myEl;
	},
	drawChart:function() {
		data = google.visualization.arrayToDataTable([
			['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
			'Western', 'Literature', { role: 'annotation' } ],
			['2010', 10, 24, 20, 32, 18, 5, ''],
			['2020', 16, 22, 23, 30, 16, 9, ''],
			['2030', 28, 19, 29, 30, 12, 13, '']
		]),
		options = {
			title:'생산현황',
			width: 600,
			height: 600,
			legend: { position: 'top', maxLines: 3 },
			bar: { groupWidth: '75%' },
			isStacked: true,
		}
		var view = new google.visualization.DataView(data);

		var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
		chart.draw(view, options);
	}
});