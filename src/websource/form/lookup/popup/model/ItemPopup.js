Ext.define('lookup.popup.model.ItemPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string'
		},{	name: 'item_code'			, type: 'string'
		},{	name: 'item_brcd_1fst'		, type: 'string'
		},{	name: 'item_brcd_2snd'		, type: 'string'
		},{	name: 'item_brcd_3trd'		, type: 'string'
		},{	name: 'item_name'			, type: 'string'
		},{	name: 'item_spec'			, type: 'string'
		},{	name: 'item_tick'			, type: 'float'
		},{	name: 'item_leng'			, type: 'float'
		},{	name: 'item_widh'			, type: 'float'
		},{	name: 'item_hght'			, type: 'float'
		},{	name: 'modl_name'			, type: 'string'
		},{	name: 'crte_urif'			, type: 'string'
		},{	name: 'unit_idcd'			, type: 'string'
		},{	name: 'lott_idnf_code'		, type: 'string'
		},{	name: 'lcls_idcd'			, type: 'string'
		},{	name: 'mcls_idcd'			, type: 'string'
		},{	name: 'scls_idcd'			, type: 'string'
		},{	name: 'acct_bacd'			, type: 'string'
		},{	name: 'acct_bacd_name'		, type: 'string'
		},{	name: 'item_stnm'			, type: 'string'
		},{	name: 'item_egnm'			, type: 'string'
		},{	name: 'item_egnm_stnm'		, type: 'string'
		},{	name: 'vatx_dvcd'			, type: 'string'
		},{	name: 'vatx_incl_yorn'		, type: 'string'
		},{	name: 'optn_item_yorn'		, type: 'string'
		},{	name: 'sets_item_yorn'		, type: 'string'
		},{	name: 'roll_mngt_yorn'		, type: 'string'
		},{	name: 'lott_mngt_yorn'		, type: 'string'
		},{	name: 'sral_mngt_yorn'		, type: 'string'
		},{	name: 'insp_objt_yorn'		, type: 'string'
		},{	name: 'insp_type_idcd'		, type: 'string'
		},{	name: 'insp_mthd_dvcd'		, type: 'string'
		},{	name: 'smpl_stnd_dvcd'		, type: 'string'
		},{	name: 'insp_levl_dvcd'		, type: 'string'
		},{	name: 'shpm_insp_yorn'		, type: 'string'
		},{	name: 'rcpt_insp_yorn'		, type: 'string'
		},{	name: 'istt_wrhs_idcd'		, type: 'string'
		},{	name: 'ostt_wrhs_idcd'		, type: 'string'
		},{	name: 'rtil_ddln_dvcd'		, type: 'string'
		},{	name: 'rtil_ddln_dcnt'		, type: 'int', defaultValue : 0
		},{	name: 'stun_exng_volm'		, type: 'string'
		},{	name: 'sral_idnf_code'		, type: 'string'
		},{	name: 'ndqt_calc_dvcd'		, type: 'string'
		},{	name: 'otod_loss_rate'		, type: 'float'
		},{	name: 'ostt_mthd_dvcd'		, type: 'string'
		},{	name: 'incm_loss_rate'		, type: 'float', defaultValue : 0
		},{	name: 'coun_iout_dvcd'		, type: 'string'
		},{	name: 'auto_istt_yorn'		, type: 'string'
		},{	name: 'imge_1fst'			, type: 'string'
		},{	name: 'imge_2snd'			, type: 'string'
		},{	name: 'user_memo'			, type: 'string'
		},{	name: 'user_memo'			, type: 'string'
		},{	name: 'sysm_memo'			, type: 'string'
		},{	name: 'prnt_idcd'			, type: 'string'
		},{	name: 'line_stat'			, type: 'string'
		},{	name: 'crte_dttm'			, type: 'string'
		},{	name: 'updt_dttm'			, type: 'string'
		},{	name: 'puch_itvl_qntt'		, type: 'float', defaultValue : 0
		},{	name: 'avrg_supl_dcnt'		, type: 'float', defaultValue : 0
		},{	name: 'optm_offr_volm'		, type: 'float', defaultValue : 0
		},{	name: 'make_cmpy_name'		, type: 'string'
		},{	name: 'make_cmpy_name2'		, type: 'string' // 삼정
		},{	name: 'make_natn'			, type: 'string'
		},{	name: 'minm_puch_qntt'		, type: 'float', defaultValue : 0
		},{	name: 'coun_iout_dvcd'		, type: 'string'
		},{	name: 'colr_bacd'			, type: 'string'
		},{	name: 'cstm_idcd'			, type: 'string'
		},{	name: 'wkfw_idcd'			, type: 'string'
		},{	name: 'prod_type_dvcd'		, type: 'string'
		},{	name: 'optn_dvcd'			, type: 'string'
		},{	name: 'optm_prod_volm'		, type: 'float', defaultValue : 0
		},{	name: 'puch_pric'			, type: 'float'
		},{	name: 'last_insp_yorn'		, type: 'string'
		},{	name: 'dplt_name'			, type: 'string'
		},{	name: 'cstm_dplt_name'		, type: 'string'
		},{	name: 'cstm_pper_dplt'		, type: 'string'
		},{	name: 'cstm_midl_boxx'		, type: 'string'
		},{	name: 'cstm_prnt_boxx'		, type: 'string'
		},{	name: 'tray'				, type: 'string'
		},{	name: 'expt_boxx_sort'		, type: 'string'
		},{	name: 'expt_boxx_wtfl'		, type: 'string'
		},{	name: 'dplt_sort'			, type: 'string'
		},{	name: 'colr_bacd_name'		, type: 'string'
		},{	name: 'cont_date'			, type: 'string'
		},{	name: 'deli_dcnt'			, type: 'float', defaultValue : 0
		},{	name: 'trnt_mthd_dvcd'		, type: 'string'
		},{	name: 'drtr_idcd'			, type: 'string'
		},{	name: 'ftmr_insp_yorn'		, type: 'string'
		},{	name: 'mdmr_insp_yorn'		, type: 'string'
		},{	name: 'ltmr_insp_yorn'		, type: 'string'
		},{	name: 'cstm_idcd'			, type: 'string'
		},{	name: 'cont_pric'			, type: 'float', defaultValue : 0
		},{	name: 'offr_pric'			, type: 'float'
		},{	name: 'sale_drtr_idcd'		, type: 'string'
		},{	name: 'item_mtrl'			, type: 'string'
		},{	name: 'istt_wrhs_name'		, type: 'string'
		},{	name: 'ostt_wrhs_name'		, type: 'string'
		},{	name: 'unit_name'			, type: 'string'
		},{	name: 'base_vend_name'		, type: 'string'
		},{	name: 'base_cstm_name'		, type: 'string'
		},{	name: 'cstm_name'			, type: 'string'
		},{	name: 'user_name'			, type: 'string'
		},{	name: 'sale_user_name'		, type: 'string'
		},{	name: 'wkfw_name'			, type: 'string'
		},{	name: 'lcls_name'			, type: 'string'
		},{	name: 'mcls_name'			, type: 'string'
		},{	name: 'scls_name'			, type: 'string'
		},{	name: 'clss_name'			, type: 'string'
		},{	name: 'unit_wigt'			, type: 'float'
		},{	name: 'item_wigt'			, type: 'float'
		},{	name: 'spgr_valu'			, type: 'float'
		},{	name: 'mtrl_bacd_name'		, type: 'string'
		},{	name: 'mtrl_bacd'			, type: 'string'
		},{	name: 'refn_valu_1fst'		, type: 'float'  , defaultValue : 1
		},{	name: 'spgr_valu2'			, type: 'float'  , defaultValue : 1
		},{	name: 'line_seqn'			, type: 'float'  , defaultValue : 0
		},{	name: 'item_clss_bacd_name'	, type: 'string'
		},{	name: 'hala_yorn'			, type: 'string'
		},{	name: 'fema'				, type: 'string'
		},{	name: 'pack_qntt'			, type: 'float'  , defaultValue : 10
		},{	name: 'stok_qntt'			, type: 'float'  , defaultValue : 0
		},{	name: 'mker_name'			, type: 'string'	// 제조사명
		},{	name: 'flat_drwg_numb'		, type: 'string'	// 2D도면번호
		},{	name: 'sold_drwg_numb'		, type: 'string'	// 3D도면번호
		},{	name: 'crty_bacd'			, type: 'string'	// 차종분류코드
		},{	name: 'crty_bacd_name'		, type: 'string'	// 차종분류코드
		},{	name: 'pcpt_itid'			, type: 'string'	// CPT품번
		},{	name: 'pcbb_itid'			, type: 'string'	// PCB품번
		},{	name: 'scpt_itid'			, type: 'string'	// SUBCPT품번
		},{	name: 'spcb_idid'			, type: 'string'	// SUBPCB품번
		},{	name: 'srfc_proc'			, type: 'string'	// 표면처리
		},{	name: 'colr_bacd'			, type: 'string'	// 컬러분류코드
		},{	name: 'colr_bacd2'			, type: 'string'	// 컬러분류코드
		},{	name: 'colr_bacd_name'		, type: 'string'	// 컬러분류코드
		},{	name: 'colr_bacd_name2'		, type: 'string'	// 컬러분류코드
		},{	name: 'msll_valu'			, type: 'string'	// MSL
		},{	name: 'dely_cstm_itid'		, type: 'string'	// 납품처품번
		},{	name: 'dely_cstm_item_name'	, type: 'string'	// 납품처품명
		},{	name: 'dely_cstm_spec'		, type: 'string'	// 납품처규격
		},{	name: 'dely_cstm_modl'		, type: 'string'	// 납품처모델
		},{	name: 'cstm_itid'			, type: 'string'	// 고객품번
		},{	name: 'cstm_item_name'		, type: 'string'	// 고객품명
		},{	name: 'cstm_spec'			, type: 'string'	// 고객규격
		},{	name: 'cstm_pric_name'		, type: 'string'	// 고객규격
		},{	name: 'stor_wrhs_idcd'		, type: 'string'	// 고객규격
		},{	name: 'stor_wrhs_name'		, type: 'string'	// 고객규격
		}
	]
});





