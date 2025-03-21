Ext.define('module.custom.komec.item.bomlist.view.BomListCstmLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-bomlist-cstm-lister2',
	store		: 'module.custom.komec.item.bomlist.store.BomListCstmLister2',
	border		: 0,
	title		: Language.get('item','제품'),
	columnLines	: true,

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{  ftype: 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->',
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	text : Language.get('item_code',	'제품코드'	) , dataIndex: 'item_code'	, width : 100, align : 'center'
					},{	text : Language.get('item_name',	'제품명'		) , dataIndex: 'item_name'	, width : 160, align : 'left'
					},
				]
			};
		return item;
	}

});

