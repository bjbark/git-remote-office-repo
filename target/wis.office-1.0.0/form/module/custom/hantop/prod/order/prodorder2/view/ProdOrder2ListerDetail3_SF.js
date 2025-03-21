Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_SF', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder2-lister-detail3_sf',
	store: 'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3_2',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ptype  :'cellediting-directinput', clicksToEdit: 1 }],
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
//					{	text : '<span class="write-button">확정</span>'		, action : 'editAction'				, cls: 'button1-style' 	},
//					{	text : '<span class="write-button">확정취소</span>'	, action : 'editCancleAction'		, cls: 'button1-style' 	},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'sf' }
				],
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
					{	dataIndex:	'line_seqn'				, text: Language.get('line_seqn'			, '순번'				) , width :  50, align : 'center'
					},{	dataIndex:	'cmpl_yorn'				, text: Language.get('cmpl_yorn'			, '완료'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:[['0','재작업'],['1','완료'],['5','오류'],['8','취소'],['9','보류']],
					},{	dataIndex:	'auto_yorn'				, text: Language.get('auto_yorn'			, '자동'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'item_name'				, text: Language.get('item_name'			, '품목명'			) , width : 160, align : 'left',
					},{	dataIndex:	'ispl_name'				, text: Language.get('ispl_name'			, '설치위치'			) , width : 100, align : 'left',
					},{	dataIndex:	'invc_qntt'				, text: Language.get('invc_qntt'			, '수량'				) , width :  50, xtype : 'numericcolumn',
					},{	dataIndex:	'dbwd_yorn'				, text: Language.get('dbwd_yorn'			, '이중창'			) , width :  65, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'cmbf_yorn'				, text: Language.get('cmbf_yorn'			, '공틀'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'bfsf_dvcd'				, text: Language.get('bfsf_dvcd'			, '틀짝망구분'		) , width :  90, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('bfsf_dvcd'), hidden : true
					},{	dataIndex:	'tblr'					, text: Language.get('tblr'					, 'TBLR'			) , width :  50, align : 'center',
					},{	dataIndex:	'ivst_ordr'				, text: Language.get('ivst_ordr'			, '투입순서'			) , width :  70, align :'center',
					},{	dataIndex:	'cutt_ordr'				, text: Language.get('cutt_ordr'			, '절단순서'			) , width :  70, xtype :'numericcolumn',
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'			) , width :  70, xtype :'numericcolumn',
					},{	dataIndex:	'sync_cutt_qntt'		, text: Language.get('sync_cutt_qntt'		, '동시절단'			) , width :  80, xtype :'numericcolumn',
					},{	dataIndex:	'pnbr_yorn'				, text: Language.get('pnbr_yorn'			, '판넬바'			) , width :  80, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'item_widh'				, text: Language.get('item_widh'			, '품목폭'			) , width :  70, xtype :'numericcolumn',
					},{	dataIndex:	'item_hght'				, text: Language.get('item_hght'			, '품목높이'			) , width :  70, xtype :'numericcolumn',
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '품목길이'			) , width :  70, xtype :'numericcolumn',
					},{	dataIndex:	'ydge_used_yorn'		, text: Language.get('ydge_used_yorn'		, '자투리사용'		) , width :  90, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'hndl_incl_yorn'		, text: Language.get('hndl_incl_yorn'		, '핸들포함'			) , width :  80, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'hndl_itid'				, text: Language.get('hndl_itid'			, '핸들명'			) , width :  80, align : 'center',xtype:'lookupcolumn',lookupValue:[['01','자동'],['02','반자동'],['03','수동']],
					},{	dataIndex:	'hndl_hght'				, text: Language.get('hndl_hght'			, '핸들높이'			) , width :  65, xtype :'numericcolumn',
					},{	dataIndex:	'clee_incl_yorn'		, text: Language.get('clee_incl_yorn'		, '크리센트포함'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'stop_incl_yorn'		, text: Language.get('stop_incl_yorn'		, 'STOPPER'			) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'clee_hght'				, text: Language.get('clee_hght'			, '크리센트높이'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_type_dvcd'		, text: Language.get('hdho_type_dvcd'		, '핸드홀타입구분'	) , width : 110, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('hdho_type_dvcd'),
					},{	dataIndex:	'hdho_1pcs_hght'		, text: Language.get('hdho_1pcs_hght'		, '핸드홀1P높이'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_2pcs_hght'		, text: Language.get('hdho_2pcs_hght'		, '핸드홀2P높이'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_hght_grip_1fst'	, text: Language.get('hdho_hght_grip_1fst'	, '핸드홀높이그립1'	) , width : 110, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_hght_grip_2snd'	, text: Language.get('hdho_hght_grip_2snd'	, '핸드홀높이그립2'	) , width : 110, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_qntt'				, text: Language.get('hdho_qntt'			, '핸드홀수'			) , width :  70, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_itvl'				, text: Language.get('hdho_itvl'			, '핸드홀간격'		) , width :  80, xtype :'numericcolumn',
					},{	dataIndex:	'hdho_pass_yorn'		, text: Language.get('hdho_pass_yorn'		, '핸드홀관통'		) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'lkho_incl_yorn'		, text: Language.get('lkho_incl_yorn'		, '락킹홀포함'		) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'lkho'					, text: Language.get('lkho'					, '락킹홀'			) , width :  60, xtype :'numericcolumn',
					},{	dataIndex:	'lkho_1pcs_widh'		, text: Language.get('lkho_1pcs_widh'		, '락킹홀1P폭'		) , width :  80, xtype :'numericcolumn',
					},{	dataIndex:	'lkho_1pcs_leng'		, text: Language.get('lkho_1pcs_leng'		, '락킹홀1P길이'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'lkho_2pcs_widh'		, text: Language.get('lkho_2pcs_widh'		, '락킹홀2P폭'		) , width :  80, xtype :'numericcolumn',
					},{	dataIndex:	'lkho_2pcs_leng'		, text: Language.get('lkho_2pcs_leng'		, '락킹홀2P길이'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'lkho_plac_cpsn'		, text: Language.get('lkho_plac_cpsn'		, '락킹홀위치보정'	) , width : 100, xtype :'numericcolumn',
					},{	dataIndex:	'lkho_grip_leng_1fst'	, text: Language.get('lkho_grip_leng_1fst'	, '락킹홀그립길이1'	) , width : 110, xtype :'numericcolumn',
					},{	dataIndex:	'rnpc_incl_yorn'		, text: Language.get('rnpc_incl_yorn'		, '고리펀칭포함'		) , width : 100, xtype :'numericcolumn',
					},{	dataIndex:	'rnpc_plac'				, text: Language.get('rnpc_plac'			, '고리펀칭위치'		) , width : 100, xtype :'numericcolumn',
					},{	dataIndex:	'rnpc_widh_1fst'		, text: Language.get('rnpc_widh_1fst'		, '고리펀칭폭1'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'rnpc_widh_2snd'		, text: Language.get('rnpc_widh_2snd'		, '고리펀칭폭2'		) , width :  90, xtype :'numericcolumn',
					},{	dataIndex:	'rolr_incl_yorn'		, text: Language.get('rolr_incl_yorn'		, '롤러포함'			) , width :  90, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rolr_name'				, text: Language.get('rolr_name'			, '롤러명'			) , width :  70, align : 'left',
					},{	dataIndex:	'rlho_cutt_angl'		, text: Language.get('rlho_cutt_angl'		, '롤러홀절단각도'	) , width : 100, xtype :'numericcolumn',
					},{	dataIndex:	'rlho_incl_yorn'		, text: Language.get('rlho_incl_yorn'		, '롤러홀포함'		) , width : 100, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'midl_rolr_name'		, text: Language.get('midl_rolr_name'		, '중간롤러명'		) , width :  80,
					},{	dataIndex:	'rlho_strt_plac'		, text: Language.get('rlho_strt_plac'		, '롤러홀시작위치'	) , width : 100, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_strt_1pcs'		, text: Language.get('rlho_strt_1pcs'		, '롤러홀1P시작'		) , width : 100, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_1pcs_widh'		, text: Language.get('rlho_1pcs_widh'		, '롤러홀1P폭'		) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_1pcs_leng'		, text: Language.get('rlho_1pcs_leng'		, '롤러홀1P길이'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_strt_2pcs'		, text: Language.get('rlho_strt_2pcs'		, '롤러홀2P시작'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_2pcs_widh'		, text: Language.get('rlho_2pcs_widh'		, '롤러홀2P폭'		) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_2pcs_leng'		, text: Language.get('rlho_2pcs_leng'		, '롤러홀2P길이'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_strt_3pcs'		, text: Language.get('rlho_strt_3pcs'		, '롤러홀3P시작'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_3pcs_widh'		, text: Language.get('rlho_3pcs_widh'		, '롤러홀3P폭'		) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'rlho_3pcs_leng'		, text: Language.get('rlho_3pcs_leng'		, '롤러홀3P길이'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'midl_rolr_strt'		, text: Language.get('midl_rolr_strt'		, '중간롤러시작'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'midl_rolr_leng'		, text: Language.get('midl_rolr_leng'		, '중간롤러길이'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'midl_rolr_incl_yorn'	, text: Language.get('midl_rolr_incl_yorn'	, '중간롤러포함'		) , width : 110, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_incl_yorn'		, text: Language.get('rein_incl_yorn'		, '보강재포함'			) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_topp_cncs_yorn'	, text: Language.get('rein_topp_cncs_yorn'	, '보강재상부체결'		) , width : 120, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_plac_1fst'		, text: Language.get('rein_plac_1fst'		, '보강재위치1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rein_plac_2snd'		, text: Language.get('rein_plac_2snd'		, '보강재위치2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rein_plac_3trd'		, text: Language.get('rein_plac_3trd'		, '보강재위치3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'hair_incl_yorn'		, text: Language.get('hair_incl_yorn'		, '모헤어포함'			) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'scrw_qntt'				, text: Language.get('scrw_qntt'			, '스크류수'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_1fst'		, text: Language.get('scrw_widh_1fst'		, '스크류폭1'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_2snd'		, text: Language.get('scrw_widh_2snd'		, '스크류폭2'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_3trd'		, text: Language.get('scrw_widh_3trd'		, '스크류폭3'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_plac'				, text: Language.get('scrw_plac'			, '스크류위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'wryp_yorn'				, text: Language.get('wryp_yorn'			, '레핑여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'brcd_hght'				, text: Language.get('brcd_hght'			, '바코드높이'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'brcd_plac'				, text: Language.get('brcd_plac'			, '바코드위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'assa_yorn'				, text: Language.get('assa_yorn'			, '아사여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'brcd'					, text: Language.get('brcd'					, '바코드'			) , width : 100, align : 'left',
					},{	dataIndex:	'prts_numb'				, text: Language.get('prts_numb'			, '부품번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'main_vent_yorn'		, text: Language.get('main_vent_yorn'		, '주벤트'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true
					},{	dataIndex:	'ctbr_numb'				, text: Language.get('ctbr_numb'			, '절단바번호'			) , width :  80, align : 'left',
					}
				]
			};
		return item;
	},
});
