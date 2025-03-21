Ext.define('module.qc.anal.insplist2.view.InspList2Lister2_1',{ extend : 'Axt.form.Panel',
	alias		: 'widget.module-insplist2-lister2_1',

	initComponent: function () {
		var me = this;
		me.items	= me.columnItem();
		me.callParent();
	},

	columnItem :function (){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height : 800,
			});
			a.id = 'insppoorview1';
			google.charts.load('current', {
				'packages' : [ 'corechart' ]
			});
			google.charts.setOnLoadCallback(me.drawChart);
			return a;
		},

	drawChart : function() {

		var store = Ext.getStore('module.qc.anal.insplist2.store.InspList2Lister2');

		store.on("datachanged", function(){

			var data = [];
			var chartdata =[];

				data.push(['담당자', '불량수량']);

				store.each(function(records){
					var temp = [];
					temp.push(records.get('user_name'));
					temp.push(records.get('poor_qntt'));
					data.push(temp);
			})
			chartdata = google.visualization.arrayToDataTable(data);
			var options = {
				title : '담당자별 불량수량',
				tooltip		: {isHtml: true },
			};
			var chart = new google.visualization.PieChart(document.getElementById('insppoorview1'));
			chart.draw(chartdata, options);
		});
	},
	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					store = Ext.getStore('module.qc.anal.insplist2.store.InspList2Lister2')
				;
				document.getElementById("insppoorview1").style.height = me.lastBox.height;
				document.getElementById("insppoorview1").style.width  = me.lastBox.width;
				var data = [];
				var chartdata =[];

				data.push(['담당자', '불량수량']);

				store.each(function(records){
					var temp = [];
					temp.push(records.get('user_name') );
					temp.push(records.get('poor_qntt'));
					data.push(temp);
				})
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					title : '담당자별 불량수량'
				};

				var chart = new google.visualization.PieChart(document.getElementById('insppoorview1'));
				chart.draw(chartdata, options);
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});