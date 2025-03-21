Ext.define('module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-isttwork2-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), ]; //me.createWordCard()
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-isttwork2-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-isttwork2-worker-editor',
									height	: 135,
									region	: 'north',
								},{	xtype	: 'module-isttwork2-worker-search',
									height	: 40,
									region	: 'north',
								},{	xtype	: 'module-isttwork2-worker-lister',
									flex	: 1,
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '입고리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-isttwork2-lister',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								},
							]
						},
					]
				}
			]
		};
		return card;
	},

});

