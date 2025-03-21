Ext.define('module.sale.sale.salework.view.SaleWorkLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-salework-layout',
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
			dockedItems : [ {xtype: 'module-salework-search'} ],
			items :[
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title	: '세금계산서 List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-salework-lister-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-salework-lister-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title	: '매출대기 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-salework-lister-master2',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-salework-lister-detail2',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title : '세금계산서 등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-salework-worker-editor',
								region	: 'north',
							},{	xtype : 'module-salework-worker-lister',
								split	: false,
								flex	: 1,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},/*  첫번째 텝  */
				]
			},
			]
		};
		return card;
	},

});