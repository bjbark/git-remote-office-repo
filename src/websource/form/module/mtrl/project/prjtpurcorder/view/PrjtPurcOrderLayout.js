Ext.define('module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prjtpurcorder-layout',
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
			dockedItems : [ { xtype: 'module-prjtpurcorder-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '발주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-prjtpurcorder-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-prjtpurcorder-lister-detail',
									flex	: 1 ,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
					 	},{	title	: '발주등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-prjtpurcorder-worker-editor',
									height	: 44,
									region	: 'north',
								},{	xtype : 'module-prjtpurcorder-worker-lister',
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
					 	},{
					 		xtype	: 'module-prjtpurcorder-lister',
							itemId	: 'itempanel',
							title	: 'BOM'	,
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
				{	xtype:'module-prjtpurcorder-worker-editor', region:'north'
				},{	xtype:'module-prjtpurcorder-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

