Ext.define('module.basic.cust.cstmcredit.view.CstmCreditLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-cstmcredit-layout',
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
			dockedItems : [ {xtype: 'module-cstmcredit-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '거래처신용등급',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-cstmcredit-lister-master',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
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

