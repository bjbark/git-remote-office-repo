Ext.define('module.custom.kitec.prod.floorticket.view.FloorTicketLister', {extend  : 'Axt.grid.Panel',
	alias		: 'widget.module-kitec-floorticket-lister',
	store		: 'module.custom.kitec.prod.floorticket.store.FloorTicket',
	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					{	text : '<span class="write-button">'+Language.get('PUBL_PRNT')+'</span>'	, action : 'printAction'		, cls: 'button1-style'	} , '-',
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items	: [
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get('line_stat'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'item_code'			, width: 140, align : 'left'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 200, align : 'left'	, text: Language.get( 'item_spec'		, '품목규격'		)
					},{	dataIndex:	'item_clss_bacd_name', width: 200, align : 'left'	, text: Language.get( 'item_clss_bacd_name'	, '품목군'	), hidden : (_global.hq_id.toUpperCase() =='N1000NBOLT'?false:true)
					},{	dataIndex:	'lcls_name'			, width: 120, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'		), hidden : (_global.hq_id.toUpperCase() !='N1000NBOLT'?false:true)
					},{	dataIndex:	'mcls_name'			, width: 120, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'		), hidden : (_global.hq_id.toUpperCase() !='N1000NBOLT'?false:true)
					},{	dataIndex:	'scls_name'			, width: 120, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'		), hidden : (_global.hq_id.toUpperCase() !='N1000NBOLT'?false:true)
					},{	dataIndex:	'cont_cstm_name'	, width: 120, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'		), hidden : (_global.hq_id.toUpperCase() !='N1000NBOLT'?false:true)					},{	dataIndex:	'roll_mngt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'roll_mngt_yorn'	, 'ROLL관리'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'lott_mngt_yorn'	, width:  75, align : 'center'	, text: Language.get( 'lott_mngt_yorn'	, 'LOT관리여부'	) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' ),
					},{	dataIndex:	'stok_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'user_memo'			, flex : 1, minWidth: 200, align : 'center'	, text: Language.get( 'user_memo'		, '비고'		)
					}
				]
			};
		return item;
	}
});






