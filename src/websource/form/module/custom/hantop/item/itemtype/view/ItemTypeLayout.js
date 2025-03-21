Ext.define('module.custom.hantop.item.itemtype.view.ItemTypeLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-itemtype-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
				layout			: 'border',
				dockedItems		: [ {xtype: 'module-itemtype-search'} ],
				items 			: [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						regin	: 'center',
						items	: [
							{	title		: '창호형태 코드 리스트',
								layout		: 'border',
								border		: 0,
								items		: [
//									{	xtype	: 'module-itemtype-master',
//										flex		: 1,
//										split		: true,
//										region	: 'west',
//										style		: Const.borderLine.left + Const.borderLine.bottom
//									},
									{	xtype	: 'module-itemtype-master',
										flex	: 2,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.left + Const.borderLine.bottom
									}
								]
							}
						]
					},{	xtype : 'module-itemtype-editor', region : 'south'
					}
				]
			}
			return card;
	},
});