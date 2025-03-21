Ext.define('module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purcordr2-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()]; //, me.createWordCard()
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-purcordr2-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주등록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-purcordr2-worker-editor',
									height	: 70,
									region	: 'north',
									hidden	: true,
								},{	xtype	: 'module-purcordr2-worker-search',
									height	: 45,
									region	: 'north',
								},{	xtype	: 'module-purcordr2-worker-lister',
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '발주리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-purcordr2-lister',
									flex	:  2 ,
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

