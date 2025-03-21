Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-dailypurclist-layout',
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
			dockedItems : [ { xtype: 'module-dailypurclist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '원단매입일보',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-dailypurclist-lister1', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '외주매입일보',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-dailypurclist-lister2', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '상품매입일보',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-dailypurclist-lister3', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '부자재매입일보',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-dailypurclist-lister4', region:'center' , style : Const.borderLine.top
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

