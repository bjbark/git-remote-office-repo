Ext.define('module.mtrl.isttcalc.purcbillwork.view.PurcBillWorkLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-purcbillwork-layout',
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
			dockedItems : [ {xtype: 'module-purcbillwork-search'} ],
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
									{	xtype	: 'module-purcbillwork-lister-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-purcbillwork-lister-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title	: '매입대기 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-purcbillwork-lister-master2',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-purcbillwork-lister-detail2',
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
							{	xtype	: 'module-purcbillwork-worker-editor',
								region	: 'north',
							},{	xtype : 'module-purcbillwork-worker-lister',
								split	: false,
								flex	: 1,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title	: '전자세금계산서 접수',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-purcbillwork-worker-editor2',
										region	: 'north',
									},{	xtype	: 'module-purcbillwork-worker-lister-master2',
										split	: true,
										flex	: 4.9,
										region	: 'west',
										style	: Const.borderLine.top
									},{	xtype	: 'module-purcbillwork-worker-lister-detail2',
										split	: true,
										flex	: 7,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					}
				]
			},
			]
		};
		return card;
	},

});