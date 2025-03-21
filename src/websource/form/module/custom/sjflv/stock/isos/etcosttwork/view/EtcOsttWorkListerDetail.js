Ext.define('module.custom.sjflv.stock.isos.etcosttwork.view.EtcOsttWorkListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-etcosttwork-lister-detail',

	store: 'module.custom.sjflv.stock.isos.etcosttwork.store.EtcOsttWorkDetail',

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
					{ text : Const.DELETE.text, iconCls : Const.DELETE.icon, action : Const.DELETE.action  ,cls: 'button-style'},
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action  ,cls: 'button-style'}
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
					{	dataIndex:	'invc_numb'			, width:  80, align : 'center' , text: Language.get( 'invc_numb'		, '출고번호'		), hidden : true
					},{	dataIndex:	'line_seqn'			, width:  40, align : 'center' , text: Language.get( 'line_seqn'		, '순번'			), xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0'
					},{	dataIndex:	'item_idcd'			, width:  80, align : 'left'   , text: Language.get( 'item_idcd'		, '품목ID'		), hidden : true
					},{	dataIndex:	'item_code'			, width: 100, align : 'left'   , text: Language.get( 'item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 250, align : 'left'   , text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 150, align : 'left'   , text: Language.get( 'item_spec'		, '규격'			)
					},{	dataIndex:	'unit_idcd'			, width:  80, align : 'left'   , text: Language.get( 'unit_idcd'		, '단위ID'		), hidden : true
					},{	dataIndex:	'unit_name'			, width:  50, align : 'left'   , text: Language.get( 'unit_name'		, '단위'			)
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right'  , text: Language.get( 'ostt_qntt'		, '출고수량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{	dataIndex:	'stnd_pric'			, width:  80, align : 'right'  , text: Language.get( 'stnd_pric'		, '단가'			), xtype: 'numericcolumn'
					},{	dataIndex:	'amnt'				, width:  80, align : 'right'  , text: Language.get( 'amnt'				, '금액'			), xtype: 'numericcolumn'  , summaryType: 'sum'
					},{	dataIndex:	'stnd_unit'			, width:  80, align : 'left'   , text: Language.get( 'stnd_unit'		, '기준단위'		), hidden : true
					},{	dataIndex:	'stnd_unit_qntt'	, width:  80, align : 'right'  , text: Language.get( 'stnd_unit_qntt'	, '기준단위수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0', hidden: true
					},{	dataIndex:	'lott_numb'			, width: 120, align : 'left'   , text: Language.get( 'lott_numb'		, 'LOT번호'		)
					},{	dataIndex:	'make_date'			, width:  80, align : 'center' , text: Language.get( ''					, '제조일자'		),
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						}
					},{	dataIndex:	'orig_invc_numb'	, width: 120, align : 'left'   , text: Language.get( 'reqt_numb'		, '요청번호'		)
					},{	dataIndex:	'orig_line_seqn'	, width:  60, align : 'center' , text: Language.get( 'reqt_seqn'		, '요청항번'		), xtype: 'numericcolumn'
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'   , text: Language.get( 'user_memo'		, '비고'			)
					},{	dataIndex:	'line_stat'			, width:  50, align : 'center' , text: Language.get( 'line_stat'		, '상태'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ), hidden: true
					}
				]
			};
		return item;
	}
 });
