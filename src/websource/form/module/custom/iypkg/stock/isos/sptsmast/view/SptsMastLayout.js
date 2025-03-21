Ext.define('module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-sptsmast-layout',
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
				dockedItems : [ {xtype: 'module-sptsmast-search'} ],
				items :[
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						items	: [
							{	title	: '출하계획 등록',
								layout	: 'border' ,
								border	: 0,
								items	: [
									{	xtype	: 'module-sptsmast-lister',
										flex	: 2.6,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.left + Const.borderLine.bottom
									},{	xtype	: 'module-sptsmast-lister2',
										flex	: 2,
										region	: 'center',
										style	: Const.borderLine.left + Const.borderLine.top
									}
								]
							},{	title : '출하계획 리스트',
								xtype : 'module-sptsmast-lister3'
							}
						]
					}
				]
			};
			return card;
		},
});
