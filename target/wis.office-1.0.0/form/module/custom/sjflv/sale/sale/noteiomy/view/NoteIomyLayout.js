Ext.define('module.custom.sjflv.sale.sale.noteiomy.view.NoteIomyLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-noteiomy-layout',
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
				dockedItems : [ {xtype: 'module-noteiomy-search'} ],
				items :[
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						items	: [
							{	title	: '어음 목록',
								xtype : 'module-noteiomy-lister'
							},{	title : '어음 현황',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-noteiomy-lister2',
										flex	: 2,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.left + Const.borderLine.bottom
									},{	xtype	: 'module-noteiomy-lister3',
										flex	: 2,
										region	: 'center',
										style	: Const.borderLine.left + Const.borderLine.top
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
