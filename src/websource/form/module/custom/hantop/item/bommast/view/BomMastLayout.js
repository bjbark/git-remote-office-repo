Ext.define('module.custom.hantop.item.bommast.view.BomMastLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-bommast-layout',

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

			dockedItems : [ {xtype: 'module-bommast-search'} ],
			items : [
				// 상단
				{	xtype	: 'tab-panel',
					layout	: 'border',
					itemId  : 'mainpanel',
					border	: 0,
					items	: [
						{	title	: 'BOM 관리',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype	: 'module-bommast-master',
											flex	: 2.1,
											region	: 'west',
											split	: true,
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype	: 'module-bommast-detail1',
											flex	: 3.1,
											split	: true,
											region	: 'west',
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype	: 'module-bommast-detail2',
											flex	: 6.1,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype	: 'module-bommast-detail4',
											flex	: 6.1,
											split	: true,
											region	: 'east',
											style	: Const.borderLine.left+ Const.borderLine.bottom
										},{	xtype	: 'module-bommast-image',
											flex	: 4,
											split	: true,
											region	: 'east',
											style	: Const.borderLine.left+ Const.borderLine.bottom
										}
									]
								}
							]
						}
					]
				// 하단
				},{	xtype	: 'tab-panel',
					itemId  : 'servepanel',
					region	: 'south',
					flex	: 1.5,
					border	:0,
					split	: true,
					items	:[
						{	title	: 'BOM 목록',
							xtype	: 'module-bommast-detail3',
							region	: 'south',
							border	:0,
							split	: true
						}
					]
				},{	xtype	: 'module-bommast-editor',
					region	: 'south',
					hidden	: false,
					style	: Const.borderLine.top,
				}
			]
		}
		return card;
	}
});