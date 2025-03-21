Ext.define('module.custom.sjflv.mtrl.imp.invoicemast.view.InvoiceMastLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-invoicemast-layout',
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
			dockedItems : [ {xtype: 'module-invoicemast-search'} ],
			items :[
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title	: 'Invoice List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-invoicemast-lister-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-invoicemast-lister-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title : 'Invoice 등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-invoicemast-worker-editor',
								region	: 'north',
							},{	xtype : 'module-invoicemast-worker-lister',
								split	: false,
								flex	: 1,
								region	: 'north',
								style	: Const.borderLine.top
							},{	xtype	: 'module-invoicemast-worker-lister2',
								region	: 'center',
								flex	: 1
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