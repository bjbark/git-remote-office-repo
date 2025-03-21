Ext.define('module.qc.insp.inspentry6.view.InspEntry6Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-inspentry6-layout',
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
			dockedItems : [ {xtype: 'module-inspentry6-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수입 검사',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspentry6-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title		: '공정검사',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-inspentry6-lister1',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
								}
							]
						},{	title		: '최종검사',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-inspentry6-lister2',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
								}
							]
						},{	title		: '출고검사',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-inspentry6-lister3',
									flex	: 2,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom // Const.borderLine.bottom
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

