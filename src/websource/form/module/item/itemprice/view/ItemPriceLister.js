Ext.define('module.item.itemprice.view.ItemPriceLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemprice-lister'			,
	store		: 'module.item.itemprice.store.ItemPriceMaster'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
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
					{	dataIndex:	'line_stat'			, width:  50, align : 'center'	, text: Language.get('line_stat'		, '상태'			) , xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_stat')
					},{	dataIndex:	'item_code'			, width: 100, align : 'center'	, text: Language.get('item_code'		, '품목코드'		)
					},{	dataIndex:	'item_name'			, width: 180, align : 'left'	, text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'item_spec'			, width: 180, align : 'left'	, text: Language.get( 'item_spec'		, '품목규격'		)
					},{	dataIndex:	'modl_name'			, width: 120, align : 'left'	, text: Language.get( 'modl_name'		, '모델명'			)
					},{	dataIndex:	'unit_name'			, width:  70, align : 'left'	, text: Language.get( ''				, '수불단위'		)
					},{	dataIndex:	'lcls_name'			, width:  80, align : 'left'	, text: Language.get( 'lcls_name'		, '대분류'			) , hidden : (_global.hq_id.toUpperCase() != 'N1000NBOLT' ? false : true)
					},{	dataIndex:	'mcls_name'			, width:  80, align : 'left'	, text: Language.get( 'mcls_name'		, '중분류'			) , hidden : (_global.hq_id.toUpperCase() != 'N1000NBOLT' ? false : true)
					},{	dataIndex:	'scls_name'			, width:  80, align : 'left'	, text: Language.get( 'scls_name'		, '소분류'			) , hidden : (_global.hq_id.toUpperCase() != 'N1000NBOLT' ? false : true)
					},{	dataIndex:	'acct_bacd_name'	, width:  80, align : 'center'	, text: Language.get( 'acct_bacd_name'	, '계정구분'		)
					},{	dataIndex:	'cont_cstm_name'	, width: 120, align : 'left'	, text: Language.get( 'cstm_name'		, '거래처'			) , hidden : (_global.hq_id.toUpperCase() != 'N1000NBOLT' ? false : true)
					},{	dataIndex:	'shpm_pric_1fst'	, width:  80, align : 'right'	, text: Language.get( 'shpm_pric_1fst'	, '출하단가1'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'shpm_pric_2snd'	, width:  80, align : 'right'	, text: Language.get( 'shpm_pric_2snd'	, '출하단가2'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'shpm_pric_3trd'	, width:  80, align : 'right'	, text: Language.get( 'shpm_pric_3trd'	, '출하단가3'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'shpm_pric_4frt'	, width:  80, align : 'right'	, text: Language.get( 'shpm_pric_4frt'	, '출하단가4'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'shpm_pric_5fit'	, width:  80, align : 'right'	, text: Language.get( 'shpm_pric_5fit'	, '출하단가5'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'cnsr_pric'			, width:  80, align : 'right'	, text: Language.get( 'cnsr_pric'		, '소비자단가'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'puch_pric'			, width:  80, align : 'right'	, text: Language.get( 'puch_pric'		, '구매단가'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0', hidden : true
					},{	dataIndex:	'item_stnm'			, width: 250, align : 'left'	, text: Language.get( 'item_stnm'		, '품목약칭'		)
					},{	dataIndex:	'coun_iout_dvcd'	, width:  70, align : 'center'	, text: Language.get( 'coun_iout_dvcd'	, '내외자'			) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'coun_iout_dvcd' ), hidden : true
					},{	dataIndex:	'optn_item_yorn'	, width:  80, align : 'center'	, text: Language.get( 'optn_item_yorn'	, '옵션품목'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ) , hidden : true
					},{	dataIndex:	'sets_item_yorn'	, width:  80, align : 'center'	, text: Language.get( 'sets_item_yorn'	, '세트품목'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'roll_mngt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'roll_mngt_yorn'	, 'ROLL관리'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'lott_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'lott_mngt_yorn'	, 'LOT관리'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'sral_mngt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'sral_mngt_yorn'	, '시리얼관리'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'insp_objt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'insp_objt_yorn'	, '검사대상'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'insp_type_idcd'	, width:  80, align : 'left'	, text: Language.get( 'insp_type_idcd'	, '검사유형ID'		) , hidden : true
					},{	dataIndex:	'insp_mthd_dvcd'	, width: 110, align : 'center'	, text: Language.get( 'insp_mthd_dvcd'	, '검사방법'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'insp_mthd_dvcd' ), hidden : true
					},{	dataIndex:	'smpl_stnd_dvcd'	, width: 110, align : 'center'	, text: Language.get( 'smpl_stnd_dvcd'	, '샘플링기준'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'smpl_stnd_dvcd' ), hidden : true
					},{	dataIndex:	'insp_levl_dvcd'	, width:  80, align : 'left'	, text: Language.get( 'insp_levl_dvcd'	, '검사수준'		), hidden : true
					},{	dataIndex:	'shpm_insp_yorn'	, width:  80, align : 'center'	, text: Language.get( 'shpm_insp_yorn'	, '출고검사'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'rcpt_insp_yorn'	, width:  80, align : 'center'	, text: Language.get( 'rcpt_insp_yorn'	, '인수검사'		) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'istt_wrhs_name'	, width:  80, align : 'left'	, text: Language.get( 'istt_wrhs_name'	, '입고창고'		), hidden : true
					},{	dataIndex:	'ostt_wrhs_name'	, width:  80, align : 'left'	, text: Language.get( 'ostt_wrhs_name'	, '출고창고'		), hidden : true
					},{	dataIndex:	'sral_idnf_code'	, width: 100, align : 'left'	, text: Language.get( 'sral_idnf_code'	, '시리얼식별코드'		), hidden : true
					},{	dataIndex:	'ndqt_calc_dvcd'	, width: 110, align : 'left'	, text: Language.get( 'ndqt_calc_dvcd'	, '소요량계산'		), hidden : true
					},{	dataIndex:	'otod_loss_rate'	, width:  80, align : 'right'	, text: Language.get( 'otod_loss_rate'	, '외주LOSS율'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.00', hidden : true
					},{	dataIndex:	'ostt_mthd_dvcd'	, width: 100, align : 'center'	, text: Language.get( 'ostt_mthd_dvcd'	, '출고방법'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'ostt_mthd_dvcd' ), hidden : true
					},{	dataIndex:	'incm_loss_rate'	, width:  80, align : 'right'	, text: Language.get( 'incm_loss_rate'	, '사내LOSS율'		) , xtype: 'numericcolumn' , summaryType: 'sum' , format:  '#,##0.00', hidden : true
					},{	dataIndex:	'auto_istt_yorn'	, width:  80, align : 'center'	, text: Language.get( 'auto_istt_yorn'	, '자동입고'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' ), hidden : true
					},{	dataIndex:	'cont_pric'			, width:  80, align : 'right'	, text: Language.get( 'cont_pric'		, '단가'			) , xtype: 'numericcolumn', hidden : true
					},{	dataIndex:	'colr_bacd_name'	, width:  80, align : 'center'	, text: Language.get( 'colr_bacd_name'	, '컬러'			)
					},{	dataIndex:	'lott_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'lott_mngt_yorn'	, 'LOT관리여부'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'stok_mngt_yorn'	, width:  60, align : 'center'	, text: Language.get( 'stok_mngt_yorn'	, '재고관리'		) , xtype: 'lookupcolumn'  , lookupValue: resource.lookup( 'yorn' )
					},{	dataIndex:	'lott_idnf_code'	, width: 150, align : 'center'	, text: Language.get( 'lott_idnf_code'	, 'LOT식별'		)
					},{	dataIndex:	'insp_type_name'	, width: 100, align : 'center'	, text: Language.get( 'insp_type_name'	, '검사유형'		)
					},{	dataIndex:	'updt_dttm'			, width: 150, align : 'center'	, text: Language.get( 'updt_dttm'		, '수정일시'		), hidden : true
					},{	dataIndex:	'crte_dttm'			, width: 100, align : 'left'	, text: Language.get( 'crte_dttm'		, '생성일시'		), hidden : true
					}
				]
			}
		;
		return item;
	}
});
