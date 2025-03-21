Ext.define('module.custom.sjflv.mtrl.imp.reportmast.view.ReportMastLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-reportmast-layout',
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
			dockedItems : [ {xtype: 'module-reportmast-search'} ],
			items :[
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title	: '수입신고필증 List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-reportmast-lister-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-reportmast-lister-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title	: '수입신고필증 등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-reportmast-worker-editor',
								height	: 105,
								region	: 'north',
							},{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-reportmast-worker-master',
										flex	: 1,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'module-reportmast-worker-editor2',
										height	: 180,
										region	: 'north',
									},{	xtype	: 'module-reportmast-worker-detail',
										region	: 'center',
										flex	: 1
									}
								]
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