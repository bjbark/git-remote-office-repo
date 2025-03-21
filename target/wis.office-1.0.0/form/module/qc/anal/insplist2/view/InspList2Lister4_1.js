Ext.define('module.qc.anal.insplist2.view.InspList2Lister4_1',{ extend : 'Axt.form.Panel',
	alias		: 'widget.module-insplist2-lister4_1',

	initComponent: function () {
		var me = this;
		me.items	= me.columnItem();
		me.callParent();

	},

	columnItem:function(){
		var me = this,
			a = Ext.create('Ext.panel.Panel', {
				layout : 'fit',
				height : 500,
				width  : 1400,
			});
		a.id = 'insppoorview3';
		google.charts.load("current", {packages:['corechart', 'bar']});

		google.charts.setOnLoadCallback(me.drawChart);
		return a;
	},


	drawChart:function() {
		var store = Ext.getStore('module.qc.anal.insplist2.store.InspList2Lister4');
			store.on("datachanged", function(){
				var data = [];
				data.push(['comp', '불량수량',{ type: 'string', role: 'tooltip'} ]);
				var color = ['blue'];
				var chartdata =[];
				for(var i = 0; i<store.data.items.length; i++){
					var temp = [];
					temp.push(store.data.items[i].data.poor_name);
					temp.push(parseFloat(store.data.items[i].data.poor_qntt));
					temp.push(store.data.items[i].data.poor_name+' : '+Ext.util.Format.number(parseFloat(store.data.items[i].data.poor_qntt), '0,000'));
					data.push(temp);
				}
				console.log(data);
				chartdata = google.visualization.arrayToDataTable(data);
				var options = {
					hAxis: {
						title: '불량구분',
						format : 'none',
						titleTextStyle:{color:'black'},
						textStyle:{ color: 'black'},
						gridlines:{ color: 'black'}
					},
					vAxis: {
						title: '불량수량',
						format : 'decimal',
						titleTextStyle:{color:'black'},
						textStyle:{ color: 'black'},
					},
					backgroundColor: '#fff',
					tooltip : {
						isHtml : true
					},
					bar : {
						groupWidth : '20%' // 예제에서 이 값을 수정
					}
				};
				var chart = new google.visualization.ColumnChart(document.getElementById('insppoorview3'));
				chart.draw(chartdata, options);
			});
	},

	listeners: {
		resize: {
			fn: function(el) {
				var me = this;
				document.getElementById('insppoorview3').style.height = me.lastBox.height
				google.charts.setOnLoadCallback(me.drawChart);
			}
		}
	},
});