Ext.define('module.custom.komec.sale.spts.sptsmast.view.SptsMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-komec-sptsmast-layout',
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
			dockedItems : [ { xtype: 'module-komec-sptsmast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '출고의뢰등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype : 'module-komec-sptsmast-worker-lister',
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '출고의뢰 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-komec-sptsmast-lister-master2',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-komec-sptsmast-lister-detail2',
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
				{	xtype:'module-komec-sptsmast-worker-editor', region:'north'
				},{	xtype:'module-komec-sptsmast-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

