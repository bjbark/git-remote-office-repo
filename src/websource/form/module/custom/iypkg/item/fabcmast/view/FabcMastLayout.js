Ext.define('module.custom.iypkg.item.fabcmast.view.FabcMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-fabcmast-layout',

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
			dockedItems : [ {xtype: 'module-fabcmast-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title		: '원단코드 관리',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-fabcmast-master',
									flex	: 30,
									region	: 'west',
								},{	layout	: 'border',
									flex	: 50,
									border	: 0,
									region	: 'center',
									items	: [
										{	flex	: 55,
											region	: 'north',
											layout	: 'border',
											items	: [
												{	xtype	: 'module-fabcmast-detail1',
													flex	: 70,
													region	: 'west',
												},{	xtype	: 'module-fabcmast-image',
													flex	: 30,
													region	: 'center',
												}
											]
										},{	xtype	: 'module-fabcmast-detail2',
											flex	: 45,
											region	: 'center',
										}
									]
								}
							]
						},{	title		: '매입처별 매입단가',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-fabcmast-master2',
									flex	: 25,
									region	: 'west',
								},{	xtype	: 'module-fabcmast-detail3',
									flex	: 75,
									border	: 0,
									region	: 'center'
								}
							]
						}
					]
				},{	xtype	: 'module-fabcmast-editor',
					region	: 'south',
					itemId	: 'editor',
					hidden	: false,
					style	: Const.borderLine.top,
				}
			]
		}
	return card;
	}
});