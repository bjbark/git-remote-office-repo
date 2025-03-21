Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16Chart', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-eisreport16-chart',
	store		: 'module.custom.iypkg.eis.eisreport16.store.EisReport16',

	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
		Ext.EventManager.onWindowResize(function(w, h){
			console.log(me);
		});
	},
	columnItem:function(){
		var me = this,
			myEl = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height	: 300,
				width	: 850,
			});
		;
		myEl.id = 'costchart';
		google.charts.load("current", {packages: ['corechart', 'bar']});
		google.charts.setOnLoadCallback(me.drawChart);

		return myEl;
	},

	drawChart:function() {
		var store = Ext.getStore('module.custom.iypkg.eis.eisreport16.store.EisReport16');
		var me = Ext.ComponentQuery.query('module-eisreport16-chart')[0];
		var today = me.dateFormat();
		store.load({
			params : {
				param:JSON.stringify({invc_date : today})
			},
			callback : function(records,operation,success){
			}
		})
		console.log(store);
		store.on("datachanged", function(){
			var data = [];
			data.push(['comp', '금액', { role: 'style' } ]);
			var color = ['pink', 'green', 'blue', 'yellow', 'red', 'skyblue'];
			var chartdata =[];
			var j = 0;
			for(var i = 0; i<store.data.items.length; i++){
				var temp = [];
				temp.push(store.data.items[i].data.name);
				temp.push(parseFloat(store.data.items[i].data.data));
				if(j>5){
					j=0;
				}
				temp.push(color[j]);
				j++;
				data.push(temp);
			}
			chartdata = google.visualization.arrayToDataTable(data);
		var options = {
				hAxis: {
					format : 'decimal',
					viewWindow: {
						min: [7, 30, 0],
						max: [17, 30, 0]
					},
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					gridlines:{color: 'black'}
				},
				vAxis: {
					title: '금액',
					format : 'decimal',
					titleTextStyle:{ color:'black'},
					textStyle:{ color: 'black'},
					maxValue : 12,
					minValue : 1,
				},
				backgroundColor: '#fff',
				tooltip : {
					isHtml : true
				},
				bar : {
					groupWidth : '40%' // 예제에서 이 값을 수정
				},
				legend: {position: 'right'},

			};
			var chart = new google.visualization.ColumnChart(document.getElementById('costchart'));
				chart.draw(chartdata, options);
		});
		var tiem_seq = null;
		if(me.ownerCt){
			store.load({
				params : {
					param:JSON.stringify({invc_date : today})
				},
				callback : function(records,operation,success){
				}
			})
			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '금액', { role: 'style' } ]);
				var color = ['pink', 'green', 'blue', 'yellow', 'red', 'skyblue'];
				var chartdata =[];
				var j = 0;
				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.name);
					temp.push(parseFloat(store.data.items[i].data.data));
					if(j>5){
						j=0;
					}
					temp.push(color[j]);
					j++;
					data.push(temp);
				}
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					hAxis: {
						format : 'decimal',
						viewWindow: {
							min: [7, 30, 0],
							max: [17, 30, 0]
						},
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
						gridlines:{color: 'black'}
					},
					vAxis: {
						title: '금액',
						format : 'decimal',
						titleTextStyle:{ color:'black'},
						textStyle:{ color: 'black'},
						maxValue : 12,
						minValue : 1,
					},
					backgroundColor: '#fff',
					tooltip : {
						isHtml : true
					},
					bar : {
						groupWidth : '40%' // 예제에서 이 값을 수정
					},
					legend: {position: 'right'},
				};
				var chart = new google.visualization.ColumnChart(document.getElementById('costchart'));
					chart.draw(chartdata, options);
			});
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
				var me = this;
				document.getElementById("costchart").style.height = me.lastBox.height
				document.getElementById("costchart").style.width = me.lastBox.width
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});