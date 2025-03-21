Ext.define('module.eis.project.loadcapalist.view.LoadCapaListChart3', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-loadcapalist-chart3',
	store		: 'module.eis.project.loadcapalist.store.LoadCapaListDetail1',
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},
	columnItem:function(){
		var store = Ext.create('Ext.data.JsonStore', {
			fields	: ['name', 'data', 'data2', 'data3'],
			data	: [
				{	'name'	: 'one',
					'data'	: 7,
					'data2'	: 5,
					'data3'	: 3
				},{	'name'	: 'two',
					'data'	: 10,
					'data2'	: 3,
					'data3'	: 3
				},{	'name'	: 'three',
					'data'	: 15,
					'data2'	: 7,
					'data3'	: 4
				},{	'name'	: 'four',
					'data'	: 3,
					'data2'	: 2,
					'data3'	: 6
				},{	'name'	: 'five',
					'data'	: 50,
					'data2'	: 7,
					'data3'	: 2
				}
			]
		});
		var a = Ext.create('Ext.chart.Chart', {
			renderTo: Ext.getBody(),
			title	: '생산현황',
			width	: 450,
			height	: 550,
			margin	: '50 0 50 0',
			animate	: true,
			store	: store,
			legend: {
				position: 'bottom'
			},
			axes	: [
				{	type	: 'Numeric',
					position: 'left',
					fields	: ['data', 'data2','data3'],
					label	: {
						renderer : Ext.util.Format.numberRenderer('0,0')
					},
					grid	: true,
				},{	type	: 'Category',
					position: 'bottom',
					fields	: ['name'],
					label: {
						rotate: {
							degrees: 315
						}
					}
				}
			],
			series: [
				{	stacked	: true,
					type	: 'column',
					axis	: 'left',
					highlight: true,
					tips	: {
						trackMouse: true,
						renderer: function (storeItem, item) {
						this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' <br>x : '+storeItem.get('data2') +'<br>y :'+storeItem.get('data3'));
						}
					},
					label : {
						stackedDisplay	: "total",
						display			: 'insideEnd',
						'text-anchor'	: 'right',
						field			: ['data','data2','data3'],
						renderer		: Ext.util.Format.numberRenderer('0'),
						color			: 'white'

					},
					xField : 'name',
					yField : ['data', 'data2','data3'],
				}
			]
		});
		return a;
	},
});