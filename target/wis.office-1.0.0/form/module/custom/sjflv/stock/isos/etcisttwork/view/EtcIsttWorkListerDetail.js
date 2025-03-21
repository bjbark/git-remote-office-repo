Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-etcisttwork-lister-detail',

	store: 'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkDetail',

	border : 0 ,
	columnLines: true ,
	features: [{ ftype : 'grid-summary' }],
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					{	text : '<span class="write-button">라벨발행</span>'	, action : 'labelAction' , cls: 'button1-style'},
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
					},{	dataIndex:	'item_code'			, width:  90, align : 'center' , text: Language.get( 'item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 180, align : 'left'   , text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 120, align : 'left'   , text: Language.get( 'item_spec'		, '규격'			)
					},{	dataIndex:	'unit_idcd'			, width:  70, align : 'left'   , text: Language.get( 'unit_idcd'		, '단위ID'		), hidden : true
					},{	dataIndex:	'unit_name'			, width:  50, align : 'left'   , text: Language.get( 'unit_name'		, '단위'			)
					},{	dataIndex:	'istt_qntt'			, width:  75, align : 'right'  , text: Language.get( 'istt_qntt'		, '입고수량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format: _global.hq_id.toUpperCase()!='N1000SJUNG'?'#,##0.##':'#,##0.##9',
					},{	dataIndex:	'stnd_pric'			, width:  80, align : 'right'  , text: Language.get( 'stnd_pric'		, '단가'			), xtype: 'numericcolumn'
					},{	dataIndex:	'amnt'				, width:  80, align : 'right'  , text: Language.get( 'amnt'				, '금액'			), xtype: 'numericcolumn'  , summaryType: 'sum'
					},{	dataIndex:	'lott_numb'			, width: 120, align : 'left'   , text: Language.get( 'lott_numb'		, 'Batch No'	)
					},{	dataIndex:	'cstm_lott_numb'	, width: 100, align : 'left'   , text: Language.get( 'cstm_lott_numb'	, 'Supplier No'	)
					},{	dataIndex:	'make_natn'			, width: 100, align : 'left'   , text: Language.get( 'make_natn'		, '제조국'		)
					},{	dataIndex:	'make_cmpy_name'	, width: 100, align : 'left'   , text: Language.get( 'make_cmpy_name'	, '제조회사'		)
					},{	dataIndex:	'make_date'			, width: 100, align : 'center' , text: Language.get( 'make_date'		, '제조일자'		),
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
					},{	dataIndex:	'rtil_ddln_date'	, width: 100, align : 'center' , text: Language.get( 'rtil_ddln_date'	, '유통기한'	),
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
					},{	dataIndex:	'pack_qntt'			, width:  75, align : 'right'  , text: Language.get( 'pack_qntt'		, '패킹단위'		), xtype: 'numericcolumn'  , hidden: _global.hqof_idcd.toUpperCase()!= 'N1000SJFLV',
					},{	dataIndex:	'stnd_unit'			, width:  80, align : 'left'   , text: Language.get( 'stnd_unit'		, '기준단위'		), hidden : true
					},{	dataIndex:	'stnd_unit_qntt'	, width:  80, align : 'right'  , text: Language.get( 'stnd_unit_qntt'	, '기준단위수량'	), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##', hidden: true
					},{	dataIndex:	'istt_wrhs_idcd'	, width:  80, align : 'left'   , text: Language.get( 'ostt_wrhs_idcd'	, '입고창고ID'	), hidden : true
					},{	dataIndex:	'istt_wrhs_name'	, width: 120, align : 'left'   , text: Language.get( 'ostt_wrhs_name'	, '입고창고'		), hidden : true
					},{	dataIndex:	'orig_invc_numb'	, width: 100, align : 'left'   , text: Language.get( 'reqt_numb'		, '요청번호'		)
					},{	dataIndex:	'orig_line_seqn'	, width:  60, align : 'center' , text: Language.get( 'reqt_seqn'		, '요청항번'		)
					},{	dataIndex:	'line_stat'			, width:  50, align : 'center' , text: Language.get( 'line_stat'		, '상태'			), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),hidden : true
					},{	dataIndex:	'user_memo'			, flex :   1, align : 'left'   , text: Language.get( 'user_memo'		, '비고'			)
					}
				]
			};
		return item;
	}
 });
