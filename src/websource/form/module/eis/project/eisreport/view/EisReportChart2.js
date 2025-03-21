Ext.define('module.eis.project.eisreport.view.EisReportChart2', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport-chart2',
	store		: 'module.eis.project.eisreport.store.EisReportChart2',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	listeners:{
		render:function(){

		},
	},
	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			height : 400
		});
		a.id='eischart2';
		google.charts.load('current', {packages: ["timeline"]});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},
	drawChart:function() {
		var store = Ext.getStore('module.eis.project.eisreport.store.EisReportChart2');
		var me = Ext.ComponentQuery.query('module-eisreport-chart2')[0];
		var today = me.dateFormat();
		store.on("datachanged", function(){
			var data = [];
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.cvic_name);
				temp.push(store.data.items[i].data.cvic_stat_dvcd);
				temp.push(new Date(store.data.items[i].data.strt_dttm));
				temp.push(new Date(store.data.items[i].data.endd_dttm));
				data.push(temp);
			}

			var container = document.getElementById('eischart2');
			var chart = new google.visualization.Timeline(container);
			var dataTable = new google.visualization.DataTable();
			dataTable.addColumn({ type: 'string', id: 'Position' });
			dataTable.addColumn({ type: 'string', id: 'Name' });
	//			dataTable.addColumn({ type: 'string', role: 'tooltip' });
			dataTable.addColumn({ type: 'date', id: 'Start' });
			dataTable.addColumn({ type: 'date', id: 'End' });
			dataTable.addRows(data);
	//				var colors = [];
	//				var colorMap = {
	//					// should contain a map of category -> color for every category
	//					진행중 : 'green',
	//					중단 : 'yellow',
	//					정지 : 'red'
	//				}
	//				for (var i = 0; i < dataTable.getNumberOfRows(); i++) {
	//					colors.push(colorMap[dataTable.getValue(i, 1)]);
	//				}
			colors = ['yellow','green'];
			var rowHeight = 41;
			var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;



			var minDate = new Date().setHours(0,0,0,0);
			var maxDate = new Date().setHours(24,0,0,0);
			var option = {
					width: $('#eischart2').width()*0.998,
					height: $('#eischart2').height(),
					colors : colors ,
					tooltip:{
	//					isHtml : false,
	//						trigger:'none'                   // 툴팁 사용안
					},
					hAxis: {
						minValue: minDate,
						maxValue: maxDate,
						format: 'HH:mm'
					},
					timeline: { showBarLabels: false }
			}
			chart.draw(dataTable,option);
		});
	},
	dateFormat:function(){
		var date = new Date(),
			yyyy = date.getFullYear().toString(),
			mm = (date.getMonth()+1).toString(),
			dd = date.getDate().toString()
		;
		if(mm < 10){
			mm = '0'+mm;
		}
		if(dd < 10){
			dd = '0'+dd;
		}
		return yyyy+mm+dd;
	},
	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					store = Ext.getStore('module.eis.project.eisreport.store.EisReportChart2')
				;
				document.getElementById("eischart2").style.height = me.lastBox.height;
				document.getElementById("eischart2").style.width = me.lastBox.width;
				google.charts.setOnLoadCallback(me.drawChart);
				store.load({
					params : {
						param:JSON.stringify({invc_date : me.dateFormat()})
					},
					callback : function(records,operation,success){
					}
				})
			}
		}
	},
});
