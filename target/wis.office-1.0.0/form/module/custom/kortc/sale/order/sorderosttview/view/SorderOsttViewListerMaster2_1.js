Ext.define('module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewListerMaster2_1', { extend: 'Axt.form.Panel',

	alias: 'widget.module-sorderosttview-lister-master2_1',


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
		a.id = 'osttview2';
		google.charts.load("current", {
			packages : [ "corechart" ]
		});
		google.charts.setOnLoadCallback(me.drawChart);

		return a;
	},
	drawChart : function() {
		var store = Ext.getStore('module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster2');

		store.on("datachanged", function(){
			var data = [];
			data.push(['월', '출고수량','금액']);
			var chartdata =[];
			store.each(function(records){
				var temp = [];
				temp.push(records.get('dlvy_date'));
				temp.push(records.get('ostt_qntt'));
				temp.push(records.get('invc_amnt'));
				data.push(temp);
			})
			chartdata = google.visualization.arrayToDataTable(data);
			console.log(chartdata);
			var options = {
				title		: '월별 변동 추이',
				vAxis		: {
					1: {
						textPosition: 'out',
						title: '수량',
					},
					0: {
						textPosition: 'out',
						title: '금액',
					},
					gridlines : {
						count : 9
					}
				},

				hAxis		: {title: '월'},
				seriesType	: 'bars',
				tooltip		: {isHtml: true },
				series		: {0:{targetAxisIndex:1},1: {pointSize: 5,type: 'line',targetAxisIndex:0}},

			};

			var chart = new google.visualization.ComboChart(document.getElementById('osttview2'));
			chart.draw(chartdata, options);
		});
	},
	listeners: {
		resize: {
			fn: function(el) {
				var	me = this,
					store = Ext.getStore('module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster2')
				;
				document.getElementById("osttview2").style.height = me.lastBox.height;
				document.getElementById("osttview2").style.width = me.lastBox.width;
				var data = [];
				data.push(['월', '출고수량','금액']);
				var chartdata =[];
				store.each(function(records){
					var temp = [];
					temp.push(records.get('dlvy_date'));
					temp.push(records.get('ostt_qntt'));
					temp.push(records.get('invc_amnt'));
					data.push(temp);
				})
				chartdata = google.visualization.arrayToDataTable(data);
				console.log(chartdata);
				var options = {
					title		: '월별 변동 추이',
					vAxis		: {
						1: {
							textPosition: 'out',
							title: '수량',
						},
						0: {
							textPosition: 'out',
							title: '금액',
						},
						gridlines : {
							count : 9
						}
					},

					hAxis		: {title: '월'},
					seriesType	: 'bars',
					tooltip		: {isHtml: true },
					series		: {0:{targetAxisIndex:1},1: {pointSize: 5,type: 'line',targetAxisIndex:0}},

				};

				var chart = new google.visualization.ComboChart(document.getElementById('osttview2'));
				chart.draw(chartdata, options);
			}
		}
	}
});
