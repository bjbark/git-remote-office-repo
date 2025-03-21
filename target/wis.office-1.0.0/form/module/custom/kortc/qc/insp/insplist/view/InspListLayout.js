Ext.define('module.custom.kortc.qc.insp.insplist.view.InspListLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-insplist-layout',
	layout:'card',
	activeItem: 0,

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), ]; //me.createWordCard()
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-insplist-search'} ],
			items :[
				{	xtype  : 'tab-panel',
					itemId : 'mainpanel',
					items  : [
						{	title	: '수입검사 리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex : 60,
								items	: [
									{	xtype	: 'module-insplist-lister', /*  상단  */
										itemId	: 'master1',
										flex	: 50,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.right
									}
								]
							},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 40,
									items	: [
										{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-insplist-detail',
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
			]
		};
		return card;
	},

});