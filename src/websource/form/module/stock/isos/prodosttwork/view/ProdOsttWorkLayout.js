Ext.define('module.stock.isos.prodosttwork.view.ProdOsttWorkLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodosttwork-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-prodosttwork-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '출고 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-prodosttwork-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-prodosttwork-lister-detail',
									flex	: 1 ,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
					 	}
					]
				}
			]
		};
		return card;
	},

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-prodosttwork-worker-editor', region:'north'
				},{	xtype:'module-prodosttwork-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

