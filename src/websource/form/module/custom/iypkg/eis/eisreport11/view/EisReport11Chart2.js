Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Chart2', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport11-chart2',
	store		: 'module.custom.iypkg.eis.eisreport11.store.EisReportChart112',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height : 330,
//				width  : 900,
			});
		a.id = 'chart11_div2';

		google.charts.load("current", {packages:['corechart']});
		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},

	drawChart:function() {
		var me = Ext.ComponentQuery.query('module-eisreport11-chart2')[0];
		var store = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart112');

		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '금액',{type: 'string', role: 'tooltip'}]);
			var chartdata =[];
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.mm);
				temp.push(parseFloat(store.data.items[i].data.istt_amnt));
				temp.push(store.data.items[i].data.mm+'월 금액 : '+parseFloat(store.data.items[i].data.istt_amnt));
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);
			var options = {
				pointsVisible: true,
				interpolateNulls : true,
				annotations: {
					style: 'line'
				},
				bar: {
					groupWidth: "95%"
				},
				legend: { position: 'none' },
					hAxis: {
						title: '월',
						format : 'none',
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
						gridlines:{ color: 'black'}
					},
					vAxis: {
						title: '금액',
						format : 'decimal',
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
					},
					tooltip : {
						isHtml : true
					},
			};
			if(document.getElementById('chart11_div2')){
				var chart = new google.visualization.LineChart(document.getElementById('chart11_div2'));
				chart.draw(chartdata, options);
			}
		});
		var tiem_seq = null;
		if(me.ownerCt){
			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '금액',{type: 'string', role: 'tooltip'}]);
				var chartdata =[];
				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.mm);
					temp.push(parseFloat(store.data.items[i].data.istt_amnt));
					temp.push(store.data.items[i].data.mm+'월 금액 : '+parseFloat(store.data.items[i].data.istt_amnt));
					data.push(temp);
				}
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					pointsVisible: true,
					interpolateNulls : true,
					annotations: {
						style: 'line'
					},
					bar: {
						groupWidth: "95%"
					},
					legend: { position: 'none' },
						hAxis: {
							title: '월',
							format : 'none',
							titleTextStyle:{ color:'black'},
							textStyle:{ color: 'black'},
							gridlines:{ color: 'black'}
						},
						vAxis: {
							title: '금액',
							format : 'decimal',
							titleTextStyle:{ color:'black'},
							textStyle:{ color: 'black'},
						},
						tooltip : {
							isHtml : true
						},
				}
;
				if(document.getElementById('chart11_div2')){
					var chart = new google.visualization.LineChart(document.getElementById('chart11_div2'));
						chart.draw(chartdata, options);
						document.getElementById("chart11_div2").style.height = me.lastBox.height;
						document.getElementById("chart11_div2").style.width = me.lastBox.width;
				}
			});
		}else{
			clearInterval(tiem_seq);
		}
	},

	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
					lister	= Ext.ComponentQuery.query('module-eisreport11-lister2')[0],
					select	= lister.getSelectionModel().getSelection()[0],
					store = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart112')
				;
				if(select){
					document.getElementById("chart11_div2").style.height = me.lastBox.height;
					document.getElementById("chart11_div2").style.width = me.lastBox.width;
					google.charts.setOnLoadCallback(me.drawChart);
					store.reload();
				}
			}
		}
	},
});