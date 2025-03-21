Ext.define('module.custom.kortc.item.itemmast.view.ItemMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-lister'			,
	store		: 'module.custom.kortc.item.itemmast.store.ItemMast'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	plugins		: [{ ptype:'filterbar'},{ ptype  :'cellediting-directinput' , clicksToEdit: 1 },{ ptype: 'gridcolumnconfig'},{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll.
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll.
    }],
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
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{	text : '<span class="write-button">품목코드 복사</span>', action : 'copyAction', cls: 'button1-style',width : 85,
						hidden	: (_global.stor_id.toUpperCase()!= 'N1000NBOLT1000'?true:false)},
						'-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get( 'line_stat'		, '상태'		) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'item_code'			, width: 100, align : 'center'	, text: Language.get( 'item_code'		, '품목코드'	)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'		, '품명'		)
					},{	dataIndex:	'item_spec'			, width: 200, align : 'left'	, text: Language.get( 'item_spec'		, '규격'		)
					},{	dataIndex:	'unit_name'			, width:  50, align : 'left'	, text: Language.get( 'unit_name'		, '단위'		),
					},{	dataIndex:	'acct_bacd_name'	, width:  70, align : 'left'	, text: Language.get( 'acct_bacd_name'	, '계정구분'	)
					},{	dataIndex:	'lcls_name'			, width: 120, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'		)
					},{	dataIndex:	'mcls_name'			, width: 120, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'		),
					},{	dataIndex:	'scls_name'			, width: 120, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'		),
					},{	dataIndex:	'stok_mngt_yorn'	, width: 120, align : 'left'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'dvrs_item_idcd'	, width: 120, align : 'center'	, text: Language.get( 'dvrs_item_idcd'	, '전용품목'	)
					},{	dataIndex:	'cont_cstm_name'	,  flex:   1, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'		)
					},
				]
			}
		;
		return item;
	}
});
