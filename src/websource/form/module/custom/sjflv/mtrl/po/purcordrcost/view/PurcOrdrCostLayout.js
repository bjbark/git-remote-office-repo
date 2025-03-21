Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcordrcost-layout',
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
			dockedItems : [ { xtype: 'module-purcordrcost-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고정산',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-purcordrcost-master',
									flex	: 0.3,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{	xtype	: 'module-purcordrcost-detail',
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
					 	}
					]
				},{	xtype	: 'module-purcordrcost-editor' ,
					region	: 'south',
					style	: Const.borderLine.left + Const.borderLine.top
				}
			]
		};
		return card;
	},
});

