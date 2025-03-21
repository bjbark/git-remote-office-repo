Ext.define('module.custom.kitec.prod.floorticket.view.FloorTicketLayout', { extend: 'Axt.form.Layout',
	alias   : 'widget.module-kitec-floorticket-layout',
	/**
	 *
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-kitec-floorticket-search'});
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items: [
				 	{ title : Language.get('item_info' , '품목 리스트'),  xtype : 'module-kitec-floorticket-lister'}
				]
			}
		];
		me.callParent(arguments);
	}
});


