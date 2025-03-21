Ext.define('module.sale.saleplan.view.SalePlanChart', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-saleplan-chart',
	store		: 'module.sale.saleplan.store.SalePlanChart',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
			layout : 'fit',
			height : 400,
			width  : 850,
		});
		a.id='saleplanchart';
		google.charts.load('current', {packages: ['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);

		return a;
	},
	drawChart:function() {
		var store = Ext.getStore('module.sale.saleplan.store.SalePlanChart');
		var me = Ext.ComponentQuery.query('module-saleplan-chart')[0];
		var today = me.dateFormat();

		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '계획',{type: 'string', role: 'tooltip'},'실적',{type: 'string', role: 'tooltip'}]);
			var color = ['red', 'blue'];
			var chartdata =[];
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.name);
				temp.push(parseFloat(store.data.items[i].data.data1));
				temp.push(store.data.items[i].data.name+'월 계획 : '+parseFloat(store.data.items[i].data.data1));
				temp.push(parseFloat(store.data.items[i].data.data2));
				temp.push(store.data.items[i].data.name+'월 실적 : '+parseFloat(store.data.items[i].data.data2));
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);
		var options = {
				hAxis: {
					title: '월',
					format : 'decimal',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					gridlines:{color: 'black'}
				},
				vAxis: {
					title: '금액',
					format : 'decimal',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
				},
				backgroundColor: '#fff',
				tooltip : {
					isHtml : true
				},
				bar : {
					groupWidth : '40%' // 예제에서 이 값을 수정
				}
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('saleplanchart'));
				chart.draw(chartdata, options);
		});
		var tiem_seq = null;
		if(me.ownerCt){
			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '계획',{type: 'string', role: 'tooltip'},'실적',{type: 'string', role: 'tooltip'}]);
				var color = ['red', 'blue'];
				var chartdata =[];
				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.name);
					temp.push(parseFloat(store.data.items[i].data.data1));
					temp.push(store.data.items[i].data.name+'월 계획 : '+parseFloat(store.data.items[i].data.data1));
					temp.push(parseFloat(store.data.items[i].data.data2));
					temp.push(store.data.items[i].data.name+'월 실적 : '+parseFloat(store.data.items[i].data.data2));
					data.push(temp);
				}
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					hAxis: {
						title: '월',
						format : 'decimal',
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
						gridlines:{color: 'black'}
					},
					vAxis: {
						title: '금액',
						format : 'decimal',
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
					},
					backgroundColor: '#fff',
					tooltip : {
						isHtml : true
					},
					bar : {
						groupWidth : '40%' // 예제에서 이 값을 수정
					}
				};
				var chart = new google.visualization.ColumnChart(document.getElementById('saleplanchart'));
					chart.draw(chartdata, options);
			});
			document.getElementById("saleplanchart").style.height = me.lastBox.height;
			document.getElementById("saleplanchart").style.width = me.lastBox.width;

		}else{
			clearInterval(tiem_seq);
		}
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
					lister	= Ext.ComponentQuery.query('module-saleplan-lister')[0],
					select	= lister.getSelectionModel().getSelection()[0],
					store = Ext.getStore('module.sale.saleplan.store.SalePlanChart')
				;
				if(select){
					document.getElementById("saleplanchart").style.height = me.lastBox.height;
					document.getElementById("saleplanchart").style.width = me.lastBox.width;
					google.charts.setOnLoadCallback(me.drawChart);
					store.reload();
				}
			}
		}
	},
});
