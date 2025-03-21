Ext.define('module.qc.basic.iteminspstd.view.ItemInspStdLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-iteminspstd-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-iteminspstd-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '검사리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-iteminspstd-lister-master', /*  상단  */
											flex	: 1,
											split	: true,
											region	: 'west',
											style	: Const.borderLine.bottom //Const.borderLine.left +
										},{	xtype	: 'module-iteminspstd-lister-detail',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								},
							]
						},{	title		: '품목등록',
							layout		: 'border',
							border		: 0,
							dockedItems	: [ {xtype: 'module-iteminspstd-lister-item'} ],
							items		: [
								{	xtype	: 'module-iteminspstd-lister-item1',
									flex	: 2,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'panel',
									region	: 'west',
									width	: 100,
									border	: 0,
									layout	: {
										type	: 'vbox',
										align	: 'center',
										pack	: 'center'
									},
									items	: [
										{	xtype	: 'button',
											action	: 'enrollment',
											text	: '<span class="btnTemp"><</span>',
											cls		: 'button-style',
											margin	: '50 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80,
										},{	xtype	: 'button',
											action	: 'remove',
											text	: '<span class="btnTemp">></span>',
											cls		: 'button-style',
											margin	: '20 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80
										}
									]
								},{	xtype	: 'module-iteminspstd-lister-item2',
									flex	: 2,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						}
					]
				}
			]
		}
		return card;
	},
});