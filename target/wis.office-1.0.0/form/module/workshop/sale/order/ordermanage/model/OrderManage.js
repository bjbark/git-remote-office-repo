Ext.define('module.workshop.sale.order.ordermanage.model.OrderManage',{ extend:'Axt.data.Model',
	fields:
	[
		 // master + item
		{name: 'invc_numb',				type: 'string'},		//견적번호
		{name: 'cstm_idcd',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'buss_numb',				type: 'string'},		//
		{name: 'shet_name',				type: 'string'},		//
		{name: 'bkbd_bind',				type: 'string'},		//
		{name: 'invc_name',				type: 'string'},		//
		{name: 'covr_spec',				type: 'string'},		//표지사양
		{name: 'attc_file_yorn',		type: 'string'},		//
		{name: 'dirt_dvcd',				type: 'string'},		//
		{name: 'shet_size_dvcd',		type: 'string'},		//
		{name: 'page_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'volm_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'shet_idcd',				type: 'string'},		//
		{name: 'prnt_colr_bacd',		type: 'string'},		//
		{name: 'acpt_stat_dvcd',		type: 'string'},		//
		{name: 'covr_dsgn_dvcd',		type: 'string'},		//표지디자인구분코드
		{name: 'bkbd_dirt_dvcd',		type: 'string'},		//
		{name: 'work_memo',			type: 'string'},		//
		{name: 'hdco_idcd',				type: 'string'},		//
		{name: 'dlvy_zpcd',				type: 'string'},		//
		{name: 'rctr_name',				type: 'string'},		//
		{name: 'dlvy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'dlvy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'esti_pric',				type: 'flaot ', defaultValue : 0},		//
		{name: 'etcc_proc_amnt',		type: 'flaot ', defaultValue : 0},		//
		{name: 'npay_baln_amnt',		type: 'float ', defaultValue:0},		//
		{name: 'colt_acct_numb',		type: 'string'},		//
		{name: 'cstm_name',				type: 'string'},		//
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'tele_numb',				type: 'string'},		//
		{name: 'addr_1fst',				type: 'string'},		//
		{name: 'deli_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'cofm_yorn',				type: 'string'},		//
		{name: 'hdco_name',				type: 'string'},		//
		{name: 'dlvy_addr_1fst',		type: 'string'},		//
		{name: 'dlvy_memo',				type: 'string'},		//
		{name: 'dlvy_reqt_memo',		type: 'string'},		//
		{name: 'colt_dttm',				type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'colt_amnt',				type: 'float ', defaultValue:0},		//
		{name: 'colt_amnt2',			type: 'string '},		//
		{name: 'esti_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'dlvy_exps',				type: 'float ', defaultValue:0},		//
		{name: 'regi_path_dvcd',		type: 'string'},		//
		{name: 'mail_addr',				type: 'string'},		//
		{name: 'addr_2snd',				type: 'string'},		//
		{name: 'vatx_incl_yorn',		type: 'string'},		//
		{name: 'cofm_dttm',				type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'dvex_burd_dvcd',		type: 'string'},		//
		{name: 'dlvy_addr_2snd',		type: 'string'},		//
		{name: 'dinv_numb',				type: 'string'},		//
		{name: 'camt_colt_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'colt_drtr_idcd',		type: 'string'},		//
		{name: 'refn_atcl_1fst',		type: 'string'},		//
		{name: 'mmbr_name',				type: 'string'},		//
		{name: 'mmbr_idcd',				type: 'string'},		//
		{name: 'corp_idcd',				type: 'string'},		//
		{name: 'rcvd_dvcd',				type: 'string'},		//
		{name: 'dsnt_amnt',				type: 'float ', defaultValue:0},		//
		{name: 'cofm_drtr_idcd',		type: 'string'},		//
		{name: 'dlvy_mthd_dvcd',		type: 'string'},		//
		{name: 'dlvy_tele_numb',		type: 'string'},		//
		{name: 'dlvy_stat_dvcd',		type: 'string'},		//
		{name: 'camt_iamt_amnt',		type: 'float ', defaultValue:0},		//
		{name: 'stot_mthd_dvcd',		type: 'string'},		//
		{name: 'refn_atcl_2snd',		type: 'string'},		//
		{name: 'ttle',					type: 'string'},		//
		{name: 'item_lcls_idcd',		type: 'string'},		//
		{name: 'item_mcls_idcd',		type: 'string'},		//
		{name: 'item_scls_idcd',		type: 'string'},		//
		{name: 'base_name'		,		type: 'string'},		//
		{name: 'prnt_mthd_dvcd',		type: 'string'},		//
		{name: 'sply_amnt',				type: 'float '},		//
		{name: 'vatx_amnt',				type: 'float '},		//
		{name: 'ttsm_amnt',				type: 'float '},		//




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
		{	name: 'clss_desc'			, type: 'string' },		//
	]
});
