Ext.define('module.custom.sjflv.mtrl.imp.estimast.view.EstiMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estimast-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() , me.createWordCard2()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-estimast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-estimast-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									itemId	: 'master',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-estimast-worker-editor',
									height	: 290,
									region	: 'south',
									hidden	: false,
								},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 1,
									items	: [
										{	title	: '견적내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											hidden	: true,
											items	: [
												{	xtype	: 'module-estimast-lister2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										}
									]
								}
							]
					 	}
					]
				}
//				,{	xtype : 'module-estimast-worker-editor', region : 'south',  hidden : false
//				}
			]
		};
		return card;
	},


	createWordCard : function () {
		var	card = {
				dockedItems : [ { xtype: 'module-estimast-worker-editor2' } ],
				layout	: 'border',
				border	: 0 ,
				items	: [
				{	xtype	:'module-estimast-worker-lister',
					region	:'west' ,
					style	: Const.borderLine.right,
					flex	: 1.4,
					split	: true
				}
			]
		};
	return card;
	},

	createWordCard2 : function () {
		var	card = {
			dockedItems : [ { xtype: 'module-estimast-worker-editor3' } ],
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype	:'module-estimast-worker-lister3',
					region	:'west' ,
					style	: Const.borderLine.right,
					flex	: 4.9,
					split	: true
				},{	xtype	:'module-estimast-worker-lister2',
					region	:'center' ,
					style	: Const.borderLine.right,
					flex	: 7,
					split	: true
				}
			]
		};
	return card;
	}
});

