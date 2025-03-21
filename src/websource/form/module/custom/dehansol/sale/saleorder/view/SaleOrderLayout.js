Ext.define('module.custom.dehansol.sale.saleorder.view.SaleOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-saleorder-layout',
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
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-saleorder-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-saleorder-lister-master',
									split	: true,
									region	: 'center',
								}
							]
						},{	title	: '첨부 파일',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-saleorder-file',
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
					 	}
					]
				},{	xtype : 'module-saleorder-editor', region : 'south', hidden : false
				}
			],
		};
		return card;
	},
});

