Ext.define('module.custom.sjflv.item.bomlist.view.BomListLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sjflv-bomlist-lister1',
	store		: 'module.custom.sjflv.item.bomlist.store.BomListLister1',
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
					{	text : Language.get('line_stat',	'상태'		) , dataIndex: 'line_stat'	, width : 50 , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat'), align : 'center'
					},{	text : Language.get('acct_name',	'계정구분'		) , dataIndex: 'acct_name'	, width : 80, align : 'center'
					},{	text : Language.get('item_code',	'품목코드'		) , dataIndex: 'item_code'	, width : 100, align : 'center'
					},{	text : Language.get('item_name',	'품명'		) , dataIndex: 'item_name'	, width : 160, align : 'left'
					},{	text : Language.get('item_name',	'규격'		) , dataIndex: 'item_spec'	, width : 100, align : 'left'
					},{	text : Language.get('cstm_name',	'거래처'		) , dataIndex: 'cstm_name'	, width : 80, align : 'left'
					},
				]
			};
		return item;
	}

});

