Ext.define('module.custom.kortc.prod.order.prodnotlist.view.ProdNotListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodnotlist-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-prodnotlist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주대비 생산현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									flex : 60,
									items	: [
										{	xtype	: 'module-prodnotlist-lister', /*  상단  */
											itemId	: 'master2',
											flex	: 50,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.left
										}
									]
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

