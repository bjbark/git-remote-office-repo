Ext.define('module.qc.insp.inspreport2.view.InspReport2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-inspreport2-layout',
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
			dockedItems : [ {xtype: 'module-inspreport2-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '자주검사',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspreport2-lister',
									flex	: 60 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								/*  하단  */
								}
							]
						},{	title	: '초중종',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspreport2-lister2',
									flex	: 60 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								/*  하단  */
								}
							]
						},{	title	: '출고검사',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspreport2-lister3',
									flex	: 60 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								/*  하단  */
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

