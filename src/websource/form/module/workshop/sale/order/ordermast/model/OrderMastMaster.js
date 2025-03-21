Ext.define('module.workshop.sale.order.ordermast.model.OrderMastMaster', { extend: 'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//견적번호
		{name: 'invc_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'regi_path_dvcd',		type: 'string', defaultValue : '1'},	// 등록경로구분코드
		{name: 'line_seqn',				type: 'float' , defaultValue : 0},		//
		{name: 'mmbr_idcd',				type: 'string'},		//
		{name: 'mmbr_name',				type: 'string'},		//
		{name: 'cstm_idcd',				type: 'string'},		//
		{name: 'tele_numb',				type: 'string'},		//
		{name: 'mail_addr',				type: 'string'},		//
		{name: 'corp_idcd',				type: 'string'},		//
		{name: 'buss_numb',				type: 'string'},		//
		{name: 'addr_1fst',				type: 'string'},		//
		{name: 'addr_2snd',				type: 'string'},		//
		{name: 'rcvd_dvcd',				type: 'string'},		//
		{name: 'invc_name',				type: 'string'},		//
		{name: 'deli_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'vatx_incl_yorn',		type: 'string'},		//
		{name: 'dsnt_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'acpt_stat_dvcd',		type: 'string', defaultValue : '0011'},		//
		{name: 'cofm_yorn',				type: 'string', defaultValue : '0'},		//
		{name: 'cofm_dttm',				type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'cofm_drtr_idcd',		type: 'string'},		//
		{name: 'hdco_idcd',				type: 'string'},		//
		{name: 'hdco_name',				type: 'string'},		//
		{name: 'dvex_burd_dvcd',		type: 'string'},		//
		{name: 'dlvy_mthd_dvcd',		type: 'string'},		//
		{name: 'dlvy_zpcd',				type: 'string'},		//
		{name: 'dlvy_addr_1fst',		type: 'string'},		//
		{name: 'dlvy_addr_2snd',		type: 'string'},		//
		{name: 'dlvy_tele_numb',		type: 'string'},		//
		{name: 'rctr_name',				type: 'string'},		//
		{name: 'dlvy_memo',				type: 'string'},		//
		{name: 'dinv_numb',				type: 'string'},		//
		{name: 'dlvy_stat_dvcd',		type: 'string'},		//
		{name: 'dlvy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'dlvy_reqt_memo',		type: 'string'},		//
		{name: 'camt_colt_dttm',		type: 'string'},		//
		{name: 'camt_iamt_amnt',		type: 'flaot ', defaultValue : 0},		//
		{name: 'npay_baln_amnt',		type: 'flaot ', defaultValue : 0},		//
		{name: 'colt_dttm',				type: 'string'},		//
		{name: 'colt_drtr_idcd',		type: 'string'},		//
		{name: 'stot_mthd_dvcd',		type: 'string'},		//
		{name: 'colt_acct_numb',		type: 'string'},		//
		{name: 'colt_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'refn_atcl_1fst',		type: 'string'},		//
		{name: 'refn_atcl_2snd',		type: 'string'},		//
		{name: 'cstm_name',				type: 'string'},		//
		{name: 'dlvy_exps',				type: 'flaot ', defaultValue : 0},		//
		{name: 'item_lcls_idcd',		type: 'string'},		//
		{name: 'item_mcls_idcd',		type: 'string'},		//
		{name: 'item_scls_idcd',		type: 'string'},		//
		{name: 'shet_size_idcd',		type: 'string'},		//
		{name: 'lcls_idcd',				type: 'string'},		//
		{name: 'mcls_idcd',				type: 'string'},		//
		{name: 'scls_idcd',				type: 'string'},		//
		{name: 'ttle',					type: 'string'},		//
		{name: 'prnt_colr_bacd',		type: 'string'},		//
		{name: 'prnt_colr_name',		type: 'string'},		//
		{name: 'prnt_mthd_dvcd',		type: 'string'},		//
		{name: 'shet_idcd',				type: 'string'},		//
		{name: 'shet_name',				type: 'string'},		//
		{name: 'shet_name2',			type: 'string'},		//
		{name: 'clss_name',				type: 'string'},		//
		{name: 'work_memo',				type: 'string'},		//
		{name: 'fdat_size_idcd',		type: 'string'},		//
		{name: 'fdat_size_name',		type: 'string'},		//
		{name: 'work_size_idcd',		type: 'string'},		//
		{name: 'work_size_name',		type: 'string'},		//
		{name: 'shet_size_dvcd',		type: 'string'},		//
		{name: 'shet_idcd_covr',		type: 'string'},		//
		{name: 'shet_name_covr',		type: 'string'},		//
		{name: 'shet_name_coti',		type: 'string'},		//
		{name: 'horz_leng',				type: 'flaot ', defaultValue : 0},		//
		{name: 'vrtl_leng',				type: 'flaot ', defaultValue : 0},		//
		{name: 'shet_wght',				type: 'flaot ', defaultValue : 0},		//
		{name: 'page_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'colr_page_qntt',		type: 'flaot ', defaultValue : 0},		//
		{name: 'volm_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'bkbd_kind_name',		type: 'string'},		//
		{name: 'bkbd_kind_idcd',		type: 'string'},		//
		{name: 'bkbd_dirt_dvcd',		type: 'string'},		//
		{name: 'bkbd_bind',				type: 'string'},		//
		{name: 'dirt_dvcd',				type: 'string'},		//
		{name: 'esti_pric',				type: 'flaot ', defaultValue : 0},		//
		{name: 'cvst_bacd_name',		type: 'string'},		//
		{name: 'cvst_bacd',				type: 'string'},		//
		{name: 'covr_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'indx_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'cofm_pric',				type: 'flaot ', defaultValue : 0},		//
		{name: 'sply_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'vatx_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'ttsm_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'work_memo_item',		type: 'string'},		//
		{name: 'prod_qntt',				type: 'float ', defaultValue : 0},		//
		{name: 'colr_page_numb',		type: 'string'},		//
		{name: 'cvst_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'esti_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'modify',				type: 'string', defaultValue : 'N'},		//
		{name: 'clss_desc',				type: 'string'},		//
		{name: 'fabc_idcd',				type: 'string'},		//
		{name: 'fabc_name',				type: 'string'},		//
		{name: 'proc_shet_idcd',		type: 'string'},		//
		{name: 'covr_shet_wght',		type: 'float'},		//
		{name: 'qntt',					type: 'float'},		//
		{name: 'assi_seqn',				type: 'float'},		//

	// corv

		{name: 'covr_dsgn_dvcd',		type: 'string'},		//표지디자인구분코드
		{name: 'covr_spec',				type: 'string'},		//표지사양
		{name: 'prnt_colr_bacd_covr',	type: 'string'},		//인쇄컬러분류코드
		{name: 'covr_colr_name',		type: 'string'},		//인쇄컬러분류명
		{name: 'shet_idcd_corv',		type: 'string'},		//원단ID
		{name: 'shet_corv_name',		type: 'string'},		//원단명
		{name: 'dsgn_yorn',				type: 'string'},		//디자인여부
		{name: 'dsgn_code',				type: 'string'},		//디자인코드
		{name: 'esti_pric_covr',		type: 'float ', defaultValue : 0},		//견적단가
		{name: 'esti_amnt_covr',		type: 'float ', defaultValue : 0},		//견적금액
		{name: 'cofm_pric_covr',		type: 'float ', defaultValue : 0},		//확정단가
		{name: 'sply_amnt_covr',		type: 'float ', defaultValue : 0},		//공급가액
		{name: 'vatx_amnt_covr',		type: 'float ', defaultValue : 0},		//부가세액
		{name: 'ttsm_amnt_covr',		type: 'float ', defaultValue : 0},		//합계금액
		{name: 'work_memo_corv',		type: 'string'},		//작업메모
		{name: 'fcvr_strg',				type: 'string'},		//앞표지문구
		{name: 'scvr_strg',				type: 'string'},		//측면표지문구
		{name: 'bcvr_strg',				type: 'string'},		//뒷표지문구
		{name: 'covr_wing_dvcd',		type: 'string'},		//표지날개구분코드

		//indx
		{name: 'indx_used_yorn',		type: 'string'},		//간지사용여부
		{name: 'shet_idcd_indx',		type: 'string'},		//원단ID
		{name: 'shet_indx_name',		type: 'string'},		//원단명
		{name: 'volm_indx_qntt',		type: 'float ', defaultValue : 0},		//권당간지수
		{name: 'prnt_colr_bacd_indx',	type: 'string'},		//인쇄컬러분류코드
		{name: 'prnt_colr_name_indx',	type: 'string'},		//인쇄컬러분류코드
		{name: 'prnt_yorn',				type: 'string'},		//인쇄여부
		{name: 'indx_yorn',				type: 'string'},		//색인표여부
		{name: 'esti_pric_indx',		type: 'float ', defaultValue : 0},		//견적단가
		{name: 'esti_amnt_indx',		type: 'float ', defaultValue : 0},		//견적금액
		{name: 'cofm_pric_indx',		type: 'float ', defaultValue : 0},		//확정단가
		{name: 'sply_amnt_indx',		type: 'float ', defaultValue : 0},		//공급가액
		{name: 'vatx_amnt_indx',		type: 'float ', defaultValue : 0},		//부가세액
		{name: 'ttsm_amnt_indx',		type: 'float ', defaultValue : 0},		//합계금액
		{name: 'work_memo_indx',		type: 'string'},		//작업메모
		{name: 'page_prnt_side',		type: 'string'},		//페이지인쇄쪽

		//proc
		{name: 'nocl_cotn_yorn',		type: 'string'},		//무색코팅여부
		{name: 'vosh_cotn_yorn',		type: 'string'},		//광택코팅여부
		{name: 'embo_yorn',				type: 'boolen'},		//엠보싱여부
		{name: 'ngls_yorn',				type: 'boolen'},		//무광여부
		{name: 'ygls_yorn',				type: 'boolen'},		//유광여부
		{name: 'bkst_yorn',				type: 'boolen'},		//책받침여부
		{name: 'hole_qntt',				type: 'float ',defaultValue:0},		//타공수
		{name: 'rdio_bkbd_yorn',		type: 'boolen'},		//무선제본여부
		{name: 'mtrl_wire_yorn',		type: 'boolen'},		//메탈와이어여부
		{name: 'limp_wire_yorn',		type: 'boolen'},		//투명와이어여부
		{name: 'bind_yorn',				type: 'boolen'},		//바인더여부
		{name: 'scvr_rdio_yorn',		type: 'boolen'},		//소프트커버무선여부
		{name: 'scvr_open_yorn',		type: 'boolen'},		//소프트커버펼침여부
		{name: 'dduk_yorn',				type: 'boolen'},		//떡제본여부
		{name: 'flat_yorn',				type: 'boolen'},		//평철여부
		{name: 'hfbk_yorn',				type: 'boolen'},		//반책여부
		{name: 'pric_idcd',				type: 'string'},		//단가ID
		{name: 'work_memo_proc',		type: 'string'},		//작업메모

		{	name: 'total'				, type: 'float ' },		//ROW레벨
		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' ,defaultValue : _global.login_nm},		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' ,defaultValue : _global.login_pk},		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});