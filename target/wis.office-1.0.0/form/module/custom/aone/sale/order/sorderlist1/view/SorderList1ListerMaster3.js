Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1ListerMaster3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderlist1-lister-master3',
	store		: 'module.custom.aone.sale.order.sorderlist1.store.SorderList1Master3'	,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'item_code'		, text : Language.get('' ,'품목코드'	) , width : 120  , align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('' ,'품명'		) , width : 180  , align : 'center'
					},{	dataIndex: 'item_spec'		, text : Language.get('' ,'규격'		) , width : 180  , align : 'left'
					}
				]
			}
		;
		return item;
	}
});