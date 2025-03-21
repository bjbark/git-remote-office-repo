Ext.define('module.custom.hantop.item.cstmitemmast.view.CstmItemMastLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-cstmitemmast-layout',

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
			dockedItems : [ {xtype: 'module-cstmitemmast-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '　한  샘　' , xtype : 'module-cstmitemmast-lister1'},
						{	title	: '　K C C　' , xtype : 'module-cstmitemmast-lister2'},
						{	title	: '　윈 체　' , xtype : 'module-cstmitemmast-lister3'},
						{	title	: '　국민창호 (구.다솔)　' , xtype : 'module-cstmitemmast-lister4'}
					]
				},{
					xtype	: 'module-cstmitemmast-editor' ,
					region	: 'south'
				}
			]
		}
		return card;
	}
});