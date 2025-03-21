Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2ListerDetail3_BF', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-prodorder2-lister-detail3_bf',
	store: 'module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3_2',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
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
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'bf'}
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
/*
					{	dataIndex:	'line_seqn'				, text: Language.get('line_seqn'			, '순번'				) , width :  50, align : 'center'
					},{	dataIndex:	'cmpl_yorn'				, text: Language.get('cmpl_yorn'			, '완료'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'auto_yorn'				, text: Language.get('auto_yorn'			, '자동'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'item_name'				, text: Language.get('item_name'			, '품목명'			) , width : 160, align : 'left',
					},{	dataIndex:	'dbwd_yorn'				, text: Language.get('dbwd_yorn'			, '이중창'			) , width :  65, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'cmbf_yorn'				, text: Language.get('cmbf_yorn'			, '공틀'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'bfsf_dvcd'				, text: Language.get('bfsf_dvcd'			, '틀짝망구분'		) , width :  90, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('bfsf_dvcd'),hidden: true
					},{	dataIndex:	'tblr'					, text: Language.get('tblr'					, 'TBLR'			) , width :  50, align : 'center',hidden: true
					},{	dataIndex:	'ivst_ordr'				, text: Language.get('ivst_ordr'			, '투입순서'			) , width :  70,align:'center',
					},{	dataIndex:	'cutt_ordr'				, text: Language.get('cutt_ordr'			, '절단순서'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'cutt_hght'				, text: Language.get('cutt_hght'			, '절단높이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'sync_cutt_qntt'		, text: Language.get('sync_cutt_qntt'		, '동시절단'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'ctbr_aset_qntt'		, text: Language.get('ctbr_aset_qntt'		, '절단바SET'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'pnbr_yorn'				, text: Language.get('pnbr_yorn'			, '판넬바유무'		) , width :  80, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'item_widh'				, text: Language.get('item_widh'			, '품목폭'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'item_hght'				, text: Language.get('item_hght'			, '품목높이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '품목길이'			) , width :  70, xtype:'numericcolumn',
					},{	dataIndex:	'ydge_used_yorn'		, text: Language.get('ydge_used_yorn'		, '자투리사용'			) , width : 100, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'hndl_incl_yorn'		, text: Language.get('hndl_incl_yorn'		, '핸들포함'			) , width :  90, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'hndl_hght'				, text: Language.get('hndl_hght'			, '핸들높이'			) , width :  65, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'clee_incl_yorn'		, text: Language.get('clee_incl_yorn'		, '크리센트포함'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'clee_hght'				, text: Language.get('clee_hght'			, '크리센트높이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_type_dvcd'		, text: Language.get('hdho_type_dvcd'		, '핸드홀타입구분'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('hdho_type_dvcd'),hidden: true
					},{	dataIndex:	'hdho_1pcs_hght'		, text: Language.get('hdho_1pcs_hght'		, '핸드홀1P높이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_2pcs_hght'		, text: Language.get('hdho_2pcs_hght'		, '핸드홀2P높이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_hght_grip_1fst'	, text: Language.get('hdho_hght_grip_1fst'	, '핸드홀높이그립1'		) , width : 110, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_hght_grip_2snd'	, text: Language.get('hdho_hght_grip_2snd'	, '핸드홀높이그립2'		) , width : 110, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_qntt'				, text: Language.get('hdho_qntt'			, '핸드홀수'			) , width :  70, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_itvl'				, text: Language.get('hdho_itvl'			, '핸드홀간격'			) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'hdho_pass_yorn'		, text: Language.get('hdho_pass_yorn'		, '핸드홀관통'			) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'lkho_incl_yorn'		, text: Language.get('lkho_incl_yorn'		, '락킹홀포함'			) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'lkho'					, text: Language.get('lkho'					, '락킹홀'			) , width :  60, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'lkho_1pcs_widh'		, text: Language.get('lkho_1pcs_widh'		, '락킹홀1P폭'		) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'lkho_1pcs_leng'		, text: Language.get('lkho_1pcs_leng'		, '락킹홀1P길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'lkho_2pcs_widh'		, text: Language.get('lkho_2pcs_widh'		, '락킹홀2P폭'		) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'lkho_2pcs_leng'		, text: Language.get('lkho_2pcs_leng'		, '락킹홀2P길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'lkho_plac_cpsn'		, text: Language.get('lkho_plac_cpsn'		, '락킹홀위치보정'		) , width : 100, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'lkho_grip_leng_1fst'	, text: Language.get('lkho_grip_leng_1fst'	, '락킹홀그립길이1'		) , width : 110, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rnpc_incl_yorn'		, text: Language.get('rnpc_incl_yorn'		, '고리펀칭포함'		) , width : 110, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rnpc_plac'				, text: Language.get('rnpc_plac'			, '고리펀칭위치'		) , width : 100, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rnpc_widh_1fst'		, text: Language.get('rnpc_widh_1fst'		, '고리펀칭폭1'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rnpc_widh_2snd'		, text: Language.get('rnpc_widh_2snd'		, '고리펀칭폭2'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'omhd_hole_incl_yorn'	, text: Language.get('omhd_hole_incl_yorn'	, '오목핸들홀포함'		) , width : 120, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'omhd_plac'				, text: Language.get('omhd_plac'			, '오목핸들위치'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'omhd_widh'				, text: Language.get('omhd_widh'			, '오목핸들폭'			) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'omhd_leng'				, text: Language.get('omhd_leng'			, '오목핸들길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'omhd_hght'				, text: Language.get('omhd_hght'			, '오목핸들높이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rolr_incl_yorn'		, text: Language.get('rolr_incl_yorn'		, '롤러포함'			) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rolr_name'				, text: Language.get('rolr_name'			, '롤러명'			) , width :  70, align : 'left',hidden: true
					},{	dataIndex:	'rlho_cutt_angl'		, text: Language.get('rlho_cutt_angl'		, '롤러홀절단각도'		) , width : 100, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_incl_yorn'		, text: Language.get('rlho_incl_yorn'		, '롤러홀포함'			) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'midl_rolr_name'		, text: Language.get('midl_rolr_name'		, '중간롤러명'			) , width :  80,hidden: true
					},{	dataIndex:	'rlho_strt_plac'		, text: Language.get('rlho_strt_plac'		, '롤러홀시작위치'		) , width : 100, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_strt_1pcs'		, text: Language.get('rlho_strt_1pcs'		, '롤러홀1P시작'		) , width : 100, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_1pcs_widh'		, text: Language.get('rlho_1pcs_widh'		, '롤러홀1P폭'		) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_1pcs_leng'		, text: Language.get('rlho_1pcs_leng'		, '롤러홀1P길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_strt_2pcs'		, text: Language.get('rlho_strt_2pcs'		, '롤러홀2P시작'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_2pcs_widh'		, text: Language.get('rlho_2pcs_widh'		, '롤러홀2P폭'		) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_2pcs_leng'		, text: Language.get('rlho_2pcs_leng'		, '롤러홀2P길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_strt_3pcs'		, text: Language.get('rlho_strt_3pcs'		, '롤러홀3P시작'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_3pcs_widh'		, text: Language.get('rlho_3pcs_widh'		, '롤러홀3P폭'		) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rlho_3pcs_leng'		, text: Language.get('rlho_3pcs_leng'		, '롤러홀3P길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'midl_rolr_strt'		, text: Language.get('midl_rolr_strt'		, '중간롤러시작'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'midl_rolr_leng'		, text: Language.get('midl_rolr_leng'		, '중간롤러길이'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rail_open_itvl'		, text: Language.get('rail_open_itvl'		, '레일개공간격'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail_zero_yorn'		, text: Language.get('rail_zero_yorn'		, '0레일여부'			) , width :  80, align : 'center'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rail_1fst_yorn'		, text: Language.get('rail_1fst_yorn'		, '1레일여부'			) , width :  80, align : 'center'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rail_2snd_yorn'		, text: Language.get('rail_2snd_yorn'		, '2레일여부'			) , width :  80, align : 'center'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rail_midl_yorn'		, text: Language.get('rail_midl_yorn'		, '중간레일여부'		) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rail_3trd_yorn'		, text: Language.get('rail_3trd_yorn'		, '3레일여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rail_4frt_yorn'		, text: Language.get('rail_4frt_yorn'		, '4레일여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'midl_rolr_incl_yorn'	, text: Language.get('midl_rolr_incl_yorn'	, '중간롤러포함'		) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'flps_mkng_incl_yorn'	, text: Language.get('flps_mkng_incl_yorn'	, '필링피스마킹포함'	) , width : 120, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'flps_plac'				, text: Language.get('flps_plac'			, '필링피스위치'		) , width :  90, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'flps_plac_2snd'		, text: Language.get('flps_plac_2snd'		, '필링피스위치2'		) , width : 100, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'rein_incl_yorn'		, text: Language.get('rein_incl_yorn'		, '보강재포함여부'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_topp_cncs_yorn'	, text: Language.get('rein_topp_cncs_yorn'	, '보강재상부체결'		) , width : 120, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_plac_1fst'		, text: Language.get('rein_plac_1fst'		, '보강재위치1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rein_plac_2snd'		, text: Language.get('rein_plac_2snd'		, '보강재위치2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rein_plac_3trd'		, text: Language.get('rein_plac_3trd'		, '보강재위치3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'hair_incl_yorn'		, text: Language.get('hair_incl_yorn'		, '모헤어포함'			) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'mult_hole_yorn'		, text: Language.get('mult_hole_yorn'		, '배수홀여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'open_widh'				, text: Language.get('open_widh'			, '개공폭'			) , width :  60, xtype:'numericcolumn',
					},{	dataIndex:	'scrn_wthl_yorn'		, text: Language.get('scrn_wthl_yorn'		, '스크린물개공'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'mult_stop_stag'		, text: Language.get('mult_stop_stag'		, '배수Stopper단계'	) , width : 110, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'tagg_asmt'				, text: Language.get('tagg_asmt'			, '태그부자재'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_qntt'				, text: Language.get('scrw_qntt'			, '스크류수'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_1fst'		, text: Language.get('scrw_widh_1fst'		, '스크류폭1'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_2snd'		, text: Language.get('scrw_widh_2snd'		, '스크류폭2'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_widh_3trd'		, text: Language.get('scrw_widh_3trd'		, '스크류폭3'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'scrw_plac'				, text: Language.get('scrw_plac'			, '스크류위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'ssbr_yorn'				, text: Language.get('ssbr_yorn'			, 'SS바유무'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rs_yorn'				, text: Language.get('rs_yorn'				, 'RS유무'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'fpfp_mkng_qntt'		, text: Language.get('fpfp_mkng_qntt'		, 'FP마킹수'			) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'fpfp_plac_3trd'		, text: Language.get('fpfp_plac_3trd'		, 'FP위치3'			) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'fpfp_plac_4frt'		, text: Language.get('fpfp_plac_4frt'		, 'FP위치4'			) , width :  80, xtype:'numericcolumn',hidden: true
					},{	dataIndex:	'akho_open_yorn_1fst'	, text: Language.get('akho_open_yorn_1fst'	, '앙카홀개공유무1'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'akho_open_yorn_2snd'	, text: Language.get('akho_open_yorn_2snd'	, '앙카홀개공유무2'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'akho_widh_1fst'		, text: Language.get('akho_widh_1fst'		, '앙카홀폭1'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'akho_widh_2snd'		, text: Language.get('akho_widh_2snd'		, '앙카홀폭2'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'wryp_yorn'				, text: Language.get('wryp_yorn'			, '레핑여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'brcd_hght'				, text: Language.get('brcd_hght'			, '바코드높이'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'brcd_plac'				, text: Language.get('brcd_plac'			, '바코드위치'			) , width :  80, xtype:'numericcolumn',
					},{	dataIndex:	'assa_yorn'				, text: Language.get('assa_yorn'			, '아사여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'brcd'					, text: Language.get('brcd'					, '바코드'			) , width : 100, align : 'left',
					},{	dataIndex:	'prts_numb'				, text: Language.get('prts_numb'			, '부품번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'main_vent_yorn'		, text: Language.get('main_vent_yorn'		, '주벤트'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),hidden: true
					},{	dataIndex:	'ctbr_numb'				, text: Language.get('ctbr_numb'			, '절단바번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'rail0_wtho_1'			, text: Language.get('rail0_wtho_1'			, '0레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_2'			, text: Language.get('rail0_wtho_2'			, '0레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_3'			, text: Language.get('rail0_wtho_3'			, '0레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_4'			, text: Language.get('rail0_wtho_4'			, '0레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_5'			, text: Language.get('rail0_wtho_5'			, '0레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_6'			, text: Language.get('rail0_wtho_6'			, '0레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_1'			, text: Language.get('rail1_wtho_1'			, '1레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_2'			, text: Language.get('rail1_wtho_2'			, '1레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_3'			, text: Language.get('rail1_wtho_3'			, '1레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_4'			, text: Language.get('rail1_wtho_4'			, '1레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_5'			, text: Language.get('rail1_wtho_5'			, '1레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_6'			, text: Language.get('rail1_wtho_6'			, '1레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_1'			, text: Language.get('rail2_wtho_1'			, '2레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_2'			, text: Language.get('rail2_wtho_2'			, '2레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_3'			, text: Language.get('rail2_wtho_3'			, '2레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_4'			, text: Language.get('rail2_wtho_4'			, '2레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_5'			, text: Language.get('rail2_wtho_5'			, '2레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_6'			, text: Language.get('rail2_wtho_6'			, '2레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_1'			, text: Language.get('rail3_wtho_1'			, '3레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_2'			, text: Language.get('rail3_wtho_2'			, '3레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_3'			, text: Language.get('rail3_wtho_3'			, '3레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_4'			, text: Language.get('rail3_wtho_4'			, '3레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_5'			, text: Language.get('rail3_wtho_5'			, '3레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_6'			, text: Language.get('rail3_wtho_6'			, '3레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_1'			, text: Language.get('rail4_wtho_1'			, '4레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_2'			, text: Language.get('rail4_wtho_2'			, '4레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_3'			, text: Language.get('rail4_wtho_3'			, '4레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_4'			, text: Language.get('rail4_wtho_4'			, '4레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_5'			, text: Language.get('rail4_wtho_5'			, '4레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_6'			, text: Language.get('rail4_wtho_6'			, '4레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_1'			, text: Language.get('rail5_wtho_1'			, '5레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_2'			, text: Language.get('rail5_wtho_2'			, '5레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_3'			, text: Language.get('rail5_wtho_3'			, '5레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_4'			, text: Language.get('rail5_wtho_4'			, '5레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_5'			, text: Language.get('rail5_wtho_5'			, '5레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_6'			, text: Language.get('rail5_wtho_6'			, '5레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'wtho_plac_1fst'		, text: Language.get('wtho_plac_1fst'		, '배수홀위치1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'wtho_plac_2snd'		, text: Language.get('wtho_plac_2snd'		, '배수홀위치2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'wtho_plac_3trd'		, text: Language.get('wtho_plac_3trd'		, '배수홀위치3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'wtho_plac_4frt'		, text: Language.get('wtho_plac_4frt'		, '배수홀위치4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'wtho_plac_5fit'		, text: Language.get('wtho_plac_5fit'		, '배수홀위치5'		) , width :  90, xtype:'numericcolumn',
					},
*/
					{	dataIndex:	'line_seqn'				, text: Language.get('line_seqn'			, '순번'				) , width :  50, align : 'center'
					},{	dataIndex:	'cmpl_yorn'				, text: Language.get('cmpl_yorn'			, '완료'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:[['0','재작업'],['1','완료'],['5','오류'],['8','취소'],['9','보류']],
					},{	dataIndex:	'auto_yorn'				, text: Language.get('auto_yorn'			, '자동'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'item_name'				, text: Language.get('item_name'			, '품목명'				) , width : 160, align : 'left',
					},{	dataIndex:	'ispl_name'				, text: Language.get('ispl_name'			, '설치위치'			) , width : 100, align : 'left',
					},{	dataIndex:	'invc_qntt'				, text: Language.get('invc_qntt'			, '수량'				) , width :  50, xtype : 'numericcolumn',
					},{	dataIndex:	'dbwd_yorn'				, text: Language.get('dbwd_yorn'			, '이중창'				) , width :  65, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'cmbf_yorn'				, text: Language.get('cmbf_yorn'			, '공틀'				) , width :  60, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'tblr'					, text: Language.get('tblr'					, 'TBLR'			) , width :  50, align : 'center'
					},{	dataIndex:	'ivst_ordr'				, text: Language.get('ivst_ordr'			, '투입순서'			) , width :  70, align : 'center',
					},{	dataIndex:	'cutt_ordr'				, text: Language.get('cutt_ordr'			, '절단순서'			) , width :  70, xtype : 'numericcolumn',
					},{	dataIndex:	'cutt_leng'				, text: Language.get('cutt_leng'			, '절단길이'			) , width :  70, xtype : 'numericcolumn',
					},{	dataIndex:	'sync_cutt_qntt'		, text: Language.get('sync_cutt_qntt'		, '동시절단'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'ctbr_aset_qntt'		, text: Language.get('ctbr_aset_qntt'		, '절단바SET'			) , width :  90, xtype : 'numericcolumn',
					},{	dataIndex:	'pnbr_yorn'				, text: Language.get('pnbr_yorn'			, '판넬바유무'			) , width :  80, align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn'),
					},{	dataIndex:	'item_widh'				, text: Language.get('item_widh'			, '품목폭'				) , width :  70, xtype : 'numericcolumn',
					},{	dataIndex:	'item_hght'				, text: Language.get('item_hght'			, '품목높이'			) , width :  70, xtype : 'numericcolumn',
					},{	dataIndex:	'stnd_abar_leng'		, text: Language.get('stnd_abar_leng'		, '품목길이'			) , width :  70, xtype : 'numericcolumn',
					},{	dataIndex:	'rail_open_itvl'		, text: Language.get('rail_open_itvl'		, '레일개공간격'			) , width :  90, xtype : 'numericcolumn',
					},{	dataIndex:	'rail_zero_yorn'		, text: Language.get('rail_zero_yorn'		, '0레일여부'			) , width :  80, align : 'center'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rail_1fst_yorn'		, text: Language.get('rail_1fst_yorn'		, '1레일여부'			) , width :  80, align : 'center'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rail_2snd_yorn'		, text: Language.get('rail_2snd_yorn'		, '2레일여부'			) , width :  80, align : 'center'  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'rail_midl_yorn'		, text: Language.get('rail_midl_yorn'		, '중간레일여부'			) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rail_3trd_yorn'		, text: Language.get('rail_3trd_yorn'		, '3레일여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rail_4frt_yorn'		, text: Language.get('rail_4frt_yorn'		, '4레일여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'midl_rolr_incl_yorn'	, text: Language.get('midl_rolr_incl_yorn'	, '중간롤러포함'			) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'flps_mkng_incl_yorn'	, text: Language.get('flps_mkng_incl_yorn'	, 'FP마킹포함'			) , width :  90, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{	dataIndex:	'fpfp_mkng_qntt'		, text: Language.get('fpfp_mkng_qntt'		, 'FP마킹수'			) , width :  80, xtype : 'numericcolumn'
					},{	dataIndex:	'flps_plac'				, text: Language.get('flps_plac'			, 'FP위치1'			) , width :  90, xtype : 'numericcolumn'
					},{	dataIndex:	'flps_plac_2snd'		, text: Language.get('flps_plac_2snd'		, 'FP위치2'			) , width : 100, xtype : 'numericcolumn'
					},{	dataIndex:	'fpfp_plac_3trd'		, text: Language.get('fpfp_plac_3trd'		, 'FP위치3'			) , width :  80, xtype : 'numericcolumn'
					},{	dataIndex:	'fpfp_plac_4frt'		, text: Language.get('fpfp_plac_4frt'		, 'FP위치4'			) , width :  80, xtype : 'numericcolumn'
					},{	dataIndex:	'rein_incl_yorn'		, text: Language.get('rein_incl_yorn'		, '보강재포함여부'		) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_topp_cncs_yorn'	, text: Language.get('rein_topp_cncs_yorn'	, '보강재상부체결'		) , width : 120, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rein_plac_1fst'		, text: Language.get('rein_plac_1fst'		, '보강재위치1'			) , width :  90, xtype : 'numericcolumn',
					},{	dataIndex:	'rein_plac_2snd'		, text: Language.get('rein_plac_2snd'		, '보강재위치2'			) , width :  90, xtype : 'numericcolumn',
					},{	dataIndex:	'rein_plac_3trd'		, text: Language.get('rein_plac_3trd'		, '보강재위치3'			) , width :  90, xtype : 'numericcolumn',
					},{	dataIndex:	'mult_hole_yorn'		, text: Language.get('mult_hole_yorn'		, '배수홀여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'open_widh'				, text: Language.get('open_widh'			, '개공폭'				) , width :  60, xtype : 'numericcolumn',
					},{	dataIndex:	'scrn_wthl_yorn'		, text: Language.get('scrn_wthl_yorn'		, '스크린물개공'			) , width : 100, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'tagg_asmt'				, text: Language.get('tagg_asmt'			, '태그부자재'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'scrw_qntt'				, text: Language.get('scrw_qntt'			, '스크류수'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'scrw_widh_1fst'		, text: Language.get('scrw_widh_1fst'		, '스크류폭1'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'scrw_widh_2snd'		, text: Language.get('scrw_widh_2snd'		, '스크류폭2'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'scrw_widh_3trd'		, text: Language.get('scrw_widh_3trd'		, '스크류폭3'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'scrw_plac'				, text: Language.get('scrw_plac'			, '스크류위치'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'ssbr_yorn'				, text: Language.get('ssbr_yorn'			, 'SS바유무'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'rs_yorn'				, text: Language.get('rs_yorn'				, 'RS유무'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'wryp_yorn'				, text: Language.get('wryp_yorn'			, '레핑여부'			) , width :  80, align : 'center'	, xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{	dataIndex:	'brcd_hght'				, text: Language.get('brcd_hght'			, '바코드높이'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'brcd_plac'				, text: Language.get('brcd_plac'			, '바코드위치'			) , width :  80, xtype : 'numericcolumn',
					},{	dataIndex:	'brcd'					, text: Language.get('brcd'					, '바코드'				) , width : 100, align : 'left',
					},{	dataIndex:	'prts_numb'				, text: Language.get('prts_numb'			, '부품번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'ctbr_numb'				, text: Language.get('ctbr_numb'			, '절단바번호'			) , width :  80, align : 'left',
					},{	dataIndex:	'rail0_wtho_1'			, text: Language.get('rail0_wtho_1'			, '0레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_2'			, text: Language.get('rail0_wtho_2'			, '0레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_3'			, text: Language.get('rail0_wtho_3'			, '0레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_4'			, text: Language.get('rail0_wtho_4'			, '0레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_5'			, text: Language.get('rail0_wtho_5'			, '0레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail0_wtho_6'			, text: Language.get('rail0_wtho_6'			, '0레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_1'			, text: Language.get('rail1_wtho_1'			, '1레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_2'			, text: Language.get('rail1_wtho_2'			, '1레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_3'			, text: Language.get('rail1_wtho_3'			, '1레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_4'			, text: Language.get('rail1_wtho_4'			, '1레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_5'			, text: Language.get('rail1_wtho_5'			, '1레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail1_wtho_6'			, text: Language.get('rail1_wtho_6'			, '1레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_1'			, text: Language.get('rail2_wtho_1'			, '2레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_2'			, text: Language.get('rail2_wtho_2'			, '2레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_3'			, text: Language.get('rail2_wtho_3'			, '2레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_4'			, text: Language.get('rail2_wtho_4'			, '2레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_5'			, text: Language.get('rail2_wtho_5'			, '2레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail2_wtho_6'			, text: Language.get('rail2_wtho_6'			, '2레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_1'			, text: Language.get('rail3_wtho_1'			, '3레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_2'			, text: Language.get('rail3_wtho_2'			, '3레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_3'			, text: Language.get('rail3_wtho_3'			, '3레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_4'			, text: Language.get('rail3_wtho_4'			, '3레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_5'			, text: Language.get('rail3_wtho_5'			, '3레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail3_wtho_6'			, text: Language.get('rail3_wtho_6'			, '3레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_1'			, text: Language.get('rail4_wtho_1'			, '4레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_2'			, text: Language.get('rail4_wtho_2'			, '4레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_3'			, text: Language.get('rail4_wtho_3'			, '4레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_4'			, text: Language.get('rail4_wtho_4'			, '4레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_5'			, text: Language.get('rail4_wtho_5'			, '4레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail4_wtho_6'			, text: Language.get('rail4_wtho_6'			, '4레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_1'			, text: Language.get('rail5_wtho_1'			, '5레일배수홀1'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_2'			, text: Language.get('rail5_wtho_2'			, '5레일배수홀2'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_3'			, text: Language.get('rail5_wtho_3'			, '5레일배수홀3'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_4'			, text: Language.get('rail5_wtho_4'			, '5레일배수홀4'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_5'			, text: Language.get('rail5_wtho_5'			, '5레일배수홀5'		) , width :  90, xtype:'numericcolumn',
					},{	dataIndex:	'rail5_wtho_6'			, text: Language.get('rail5_wtho_6'			, '5레일배수홀6'		) , width :  90, xtype:'numericcolumn',
					},
				]
			};
		return item;
	},
});
