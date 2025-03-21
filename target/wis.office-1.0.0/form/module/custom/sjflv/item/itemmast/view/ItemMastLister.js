Ext.define('module.custom.sjflv.item.itemmast.view.ItemMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemmast-lister'			,
	store		: 'module.custom.sjflv.item.itemmast.store.ItemMast'	,
	selModel	: { selType: 'checkboxmodel', mode : _global.hq_id.toUpperCase() == 'N1000SJFLV' ? 'MULTI' : 'SINGLE' },
	border		: 0,
	columnLines : true,
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
//					{	xtype   : 'button',
//						iconCls : 'filterIcon',
//						toggleGroup:'onoff',
//						listeners:{
//							toggle:function(toggle){
//								var filter = me.filterBar;
//									filter.setVisible(toggle.pressed);
//							}
//						}
//					},
					'->', '-',
					{text : '<span class="write-button">일괄정보변경</span>'  , action : 'popupAction2'     , cls: 'button1-style', width: 90	,itemId : 'popup2'},
					{text : '<span class="write-button">라벨발행</span>'    , action : 'printAction'      , cls: 'button1-style', width: 90	,itemId : 'popup', hidden : true },
					{text : '<span class="write-button">원료성분조회</span>'  , action : 'popupAction'      , cls: 'button1-style', width: 90	,itemId : 'print' ,hidden : true },
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style'} ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item_sjflv = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get( 'line_stat'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'acct_bacd_name'	, width:  80, align : 'center'	, text: Language.get( 'acct_bacd_name'	, '계정구분'		)
					},{	dataIndex:	'item_code'			, width: 100, align : 'center'	, text: Language.get( 'item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 200, align : 'left'	, text: Language.get( 'item_spec'		, '품목규격'		)
					},{	dataIndex:	'mtrl_labl_name'	, width: 100, align : 'left'	, text: Language.get( 'mtrl_labl_name'	, '라벨내용'		)
					},{	dataIndex:	'lcls_name'			, width: 120, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'			)
					},{	dataIndex:	'mcls_name'			, width: 120, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'			)
					},{	dataIndex:	'scls_name'			, width: 120, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'			)
					},{	dataIndex:	'cont_cstm_name'	, width: 120, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'			)
					},{	dataIndex:	'pkge_name'			, width: 100, align : 'left'	, text: Language.get( 'pkge_name'		, '포장정보'		) ,
					},{	dataIndex:	'stok_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'lott_idnf_code'	, width: 150, align : 'center'	, text: Language.get( 'lott_idnf_code'	, 'Batch 식별'	)
					},{	dataIndex:	'insp_type_name'	, width: 100, align : 'center'	, text: Language.get( 'insp_type_name'	, '검사유형'		)
					},{	dataIndex:	'hala_yorn'			, width:  60, align : 'center'	, text: Language.get( 'hala_yorn'		, '할랄여부'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'otod_yorn'			, width:  70, align : 'center'	, text: Language.get( 'otod_yorn'		, 'OEM여부'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'make_cmpy_name2'	, width: 100, align : 'center'	, text: Language.get( ''				, '제조회사'		)
					},{	dataIndex:	'item_make_numb'	, width: 100, align : 'left'	, text: Language.get( ''				, '품목보고'		)
					},{	dataIndex:	'labl_algy_name'	, width: 100, align : 'center'	, text: Language.get( 'labl_algy_code'	, '라벨알러지'		)
					},{	dataIndex:	'labl_chck_yorn'	, width:  60, align : 'center'	, text: Language.get( 'labl_chck_yorn'	, '라벨확인'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'updt_dttm'			, width: 150, align : 'center'	, text: Language.get( 'updt_dttm'		, '수정일시'		) , hidden : true
					},{	dataIndex:	'crte_dttm'			, width: 100, align : 'left'	, text: Language.get( 'crte_dttm'		, '생성일시'		) , hidden : true
					}
				]
			},
			item_sjung = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get( 'line_stat'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'acct_bacd_name'	, width:  80, align : 'center'	, text: Language.get( 'acct_bacd_name'	, '계정구분'		)
					},{	dataIndex:	'item_code'			, width: 100, align : 'center'	, text: Language.get( 'item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 200, align : 'left'	, text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 200, align : 'left'	, text: Language.get( 'item_spec'		, '품목규격'		)
					},{	dataIndex:	'unit_name'			, width:  70, align : 'left'	, text: Language.get( 'unit_name'		, '수불단위'		)
					},{	dataIndex:	'lcls_name'			, width: 120, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'			)
					},{	dataIndex:	'mcls_name'			, width: 120, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'			)
					},{	dataIndex:	'scls_name'			, width: 120, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'			)
					},{	dataIndex:	'cont_cstm_name'	, width: 120, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'			)
					},{	dataIndex:	'cnsr_pric'			, width:  80, align : 'right'	, text: Language.get( 'cnsr_pric'		, '소비자단가'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'puch_pric'			, width:  80, align : 'right'	, text: Language.get( 'puch_pric'		, '구매단가'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'pkge_name'			, width: 100, align : 'left'	, text: Language.get( 'pkge_name'		, '포장정보'		) ,
					},{	dataIndex:	'coun_iout_dvcd'	, width:  70, align : 'center'	, text: Language.get( 'coun_iout_dvcd'	, '내외자'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'coun_iout_dvcd' ), hidden : true
					},{	dataIndex:	'optn_item_yorn'	, width:  80, align : 'center'	, text: Language.get( 'optn_item_yorn'	, '옵션품목'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ) , hidden : true
					},{	dataIndex:	'sets_item_yorn'	, width:  80, align : 'center'	, text: Language.get( 'sets_item_yorn'	, '세트품목'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'incm_loss_rate'	, width:  80, align : 'right'	, text: Language.get( 'incm_loss_rate'	, '사내LOSS율'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.00', hidden : true
					},{	dataIndex:	'auto_istt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'auto_istt_yorn'	, '자동입고'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'colr_bacd_name'	, width:  80, align : 'center'	, text: Language.get( 'colr_bacd_name'	, '컬러'			) ,
					},{	dataIndex:	'lott_mngt_yorn'	, width:  75, align : 'center'	, text: Language.get( 'lott_mngt_yorn'	, 'Batch 관리'	) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' ),
					},{	dataIndex:	'stok_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'lott_idnf_code'	, width: 150, align : 'center'	, text: Language.get( 'lott_idnf_code'	, 'Batch 식별'	)
					},{	dataIndex:	'insp_type_name'	, width: 100, align : 'center'	, text: Language.get( 'insp_type_name'	, '검사유형'		)
					},{	dataIndex:	'updt_dttm'			, width: 150, align : 'center'	, text: Language.get( 'updt_dttm'		, '수정일시'		) , hidden : true
					},{	dataIndex:	'crte_dttm'			, width: 100, align : 'left'	, text: Language.get( 'crte_dttm'		, '생성일시'		) , hidden : true
					}
				]
			}
		;
		return _global.hq_id.toUpperCase()=='N1000SJFLV'? item_sjflv : item_sjung;
	}
});
