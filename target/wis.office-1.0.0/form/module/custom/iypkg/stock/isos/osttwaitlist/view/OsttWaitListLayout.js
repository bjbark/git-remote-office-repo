Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.view.OsttWaitListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-osttwaitlist-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-osttwaitlist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '출고 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-osttwaitlist-lister', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '미출고 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-osttwaitlist-lister2', region:'center' , style : Const.borderLine.top
								}
							]
						}
					]
				}
			]
		};
		return card;
	},

});

