Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay.view.InitStayLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-initstay-layout',
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
			dockedItems : [ { xtype: 'module-mtrl-initstay-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '이월품목 목록',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{ /*  하단  */
									xtype	: 'module-mtrl-initstay-lister-master',
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
					 	},{	title : '이월품목 등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-mtrl-initstay-worker-editor',
									height	: 45,
									region	: 'north',
								},{	xtype : 'module-mtrl-initstay-worker-lister',
									split	: false,
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
				{	xtype:'module-mtrl-initstay-worker-editor', region:'north'
				},{	xtype:'module-mtrl-initstay-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

