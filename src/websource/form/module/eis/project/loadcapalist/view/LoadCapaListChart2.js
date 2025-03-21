Ext.define('module.eis.project.loadcapalist.view.LoadCapaListChart2', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-loadcapalist-chart2',
	store		: 'module.eis.project.loadcapalist.store.LoadCapaListDetail1',
	initComponent: function () {
		var me = this;
		me.items = me.columnItem();
		me.callParent();
	},

	columnItem:function(){
		var a = Ext.create('Ext.panel.Panel', {
//			title	: '품목별 생산현황',
			height	: 630,
			layout	: 'fit',
			items	: [
				{	xtype	: 'chart',
					width	: 400,
					margin	: '50 0 20 0',
					height	: 300,
					store	: 'module.prod.order.prodrealtime.store.ProdRealTime3',
					axes	: [
						{	type	: 'category',
							position: 'bottom',
							fields	: ['item_code'],
							label: {
								rotate: {
									degrees: 330
								}
							}
						},{	type	: 'Numeric',
							position: 'left',
							fields	: ['day_qntt'],
							minimum	: 0,
							maximum	: 1000,
							grid: true
						}
					],
					series	: [
						{	type	: 'column',
							axis	: 'left',
							renderer: function(sprite, record, attr) {
								return Ext.apply(attr, {
									fill: '#F03737'
								});
							},
							highlight: true,
							tips	: {
								trackMouse	: true,
								renderer	: function (storeItem,item) {
									this.update(storeItem.get('item_name')+' : '+storeItem.get('day_qntt'));
								}
							},
							label : {
								display	: 'insideEnd',
								field	: 'day_qntt',
								renderer: Ext.util.Format.numberRenderer('0'),
								color	: 'white',
								'text-anchor': 'right'
							},
							xField : 'item_name',
							yField : 'day_qntt'
						}
					],
					items : [
						{	type	: 'text',
							text	: 'Load 현황',
							font	: '18px Arial',
							width	: 100,
							height	: 15,
							x		: 150,
							y		: 10
						}
					]
				}
			]
		}).show();
	return a;
	}
});