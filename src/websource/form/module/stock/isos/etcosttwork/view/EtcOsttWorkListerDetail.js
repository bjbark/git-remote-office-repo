Ext.define('module.stock.isos.etcosttwork.view.EtcOsttWorkListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-etcosttwork-lister-detail',

	store: 'module.stock.isos.etcosttwork.store.EtcOsttWorkDetail',

	border : 0 ,
	columnLines: true ,
	features: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'}
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'line_seqn'			, width:  40, align : 'center' , text: Language.get( 'line_seqn'		, '순번'			), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'item_idcd'			, width:  80, align : 'left'   , text: Language.get( 'item_idcd'		, '품목ID'		), hidden : true
					},{	dataIndex:	'item_code'			, width: 100, align : 'left'   , text: Language.get( 'item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'   , text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 150, align : 'left'   , text: Language.get( 'item_spec'		, '규격'			)
					},{	dataIndex:	'unit_idcd'			, width:  80, align : 'left'   , text: Language.get( 'unit_idcd'		, '단위ID'		), hidden : true
					},{	dataIndex:	'unit_name'			, width:  50, align : 'left'   , text: Language.get( 'unit_name'		, '단위'			)
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right'  , text: Language.get( 'ostt_qntt'		, '출고수량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'stnd_unit'			, width:  80, align : 'left'   , text: Language.get( 'stnd_unit'		, '기준단위'		), hidden : true
					},{	dataIndex:	'stnd_unit_qntt'	, width:  80, align : 'right'  , text: Language.get( 'stnd_unit_qntt'	, '기준단위수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0', hidden: true
					},{	dataIndex:	'lott_numb'			, width: 120, align : 'left'   , text: Language.get( 'lott_numb'		, 'LOT번호'		)
					},{	dataIndex:	'orig_invc_numb'	, width: 120, align : 'left'   , text: Language.get( 'reqt_numb'		, '요청번호'		)
					},{	dataIndex:	'orig_line_seqn'	, width:  60, align : 'center' , text: Language.get( 'reqt_seqn'		, '요청항번'		), xtype: 'numericcolumn'
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'   , text: Language.get( 'user_memo'		, '비고'			)
					},{	dataIndex:	'line_stat'			, width:  50, align : 'center' , text: Language.get( 'line_stat'		, '상태'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' )
					}
				]
			};
		return item;
	}
 });
