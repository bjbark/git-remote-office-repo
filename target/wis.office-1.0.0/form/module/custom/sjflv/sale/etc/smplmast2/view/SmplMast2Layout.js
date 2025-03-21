Ext.define('module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Layout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-smplmast2-layout',
	 layout:'card',
		activeItem: 0,

		/**
		 * 초기화 콤포넌트
		 */
		initComponent: function(config){
			var me = this;
			me.items = [ me.createListCard()]; //, me.createWordCard()
			me.callParent(arguments);
		},

		/**
		 *
		 */
		createListCard : function () {
			var card = {
				layout : 'border',
				border: 0 ,
				dockedItems : [ {xtype: 'module-smplmast2-search'} ],
				items :[
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						items	: [
							{	title	: '내수 샘플',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-smplmast2-lister',
										flex	:  2 ,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.bottom
									}
								]
							},{	title	: '천연향 샘플',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-smplmast2-lister2',
										flex	:  2 ,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.bottom
									}
								]
							},{	title	: '색소 샘플',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-smplmast2-lister3',
										flex	:  2 ,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.bottom
									}
								]
							},{	title	: 'Offer 샘플',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-smplmast2-lister4',
										flex	:  2 ,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.bottom
									}
								]
							},{	title	: '해외샘플',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-smplmast2-lister5',
										flex	:  2 ,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.bottom
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
