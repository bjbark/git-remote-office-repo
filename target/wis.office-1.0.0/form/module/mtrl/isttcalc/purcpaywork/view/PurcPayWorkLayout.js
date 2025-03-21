Ext.define('module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-purcpaywork-layout',
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
			dockedItems : [ {xtype: 'module-purcpaywork-search'} ],
			items :[
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title	: '지급 List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-purcpaywork-lister-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-purcpaywork-lister-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title	: '지급대기 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-purcpaywork-lister-master2',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-purcpaywork-lister-detail2',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title : '지급 등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-purcpaywork-worker-editor',
								region	: 'north',
							},{	xtype : 'module-purcpaywork-worker-lister',
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