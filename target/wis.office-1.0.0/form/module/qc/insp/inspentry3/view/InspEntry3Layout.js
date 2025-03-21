Ext.define('module.qc.insp.inspentry3.view.InspEntry3Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-inspentry3-layout',
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
			dockedItems : [ {xtype: 'module-inspentry3-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수입검사 입력',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspentry3-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-inspentry3-lister-detail',
									flex	: 1 ,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '검사 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inspentry3-lister2-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-inspentry3-lister2-detail',
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
				{	xtype:'module-inspentry3-worker-editor', region:'north'
				},{	xtype:'module-inspentry3-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

