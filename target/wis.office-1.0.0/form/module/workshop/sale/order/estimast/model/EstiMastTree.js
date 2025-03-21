Ext.define('module.workshop.sale.order.estimast.model.EstiMastTree',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'id', 				type: 'string'},
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
		{name: 'dsgn_code',				type: 'string'},		//
		{name: 'covr_dsgn_dvcd',		type: 'string'},		//
		{name: 'shet_name_coti',		type: 'string'},		//
		{name: 'horz_leng',				type: 'flaot ', defaultValue : 0},		//
		{name: 'vrtl_leng',				type: 'flaot ', defaultValue : 0},		//
		{name: 'shet_wght',				type: 'flaot ', defㄹaultValue : 0},		//
		{name: 'page_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'colr_page_qntt',		type: 'flaot ', defaultValue : 0},		//
		{name: 'volm_qntt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'bkbd_kind_name',		type: 'string'},		//
		{name: 'bkbd_kind_idcd',		type: 'string'},		//
		{name: 'bkbd_dirt_dvcd',		type: 'string'},		//
		{name: 'bkbd_bind',				type: 'string'},		//
		{name: 'dirt_dvcd',				type: 'string'},		//
		{name: 'esti_pric',				type: 'string '},		//
		{name: 'cvst_bacd_name',		type: 'string'},		//
		{name: 'cvst_bacd',				type: 'string'},		//
		{name: 'covr_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'indx_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'cofm_pric',				type: 'flaot ', defaultValue : 0},		//
		{name: 'sply_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'vatx_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'ttsm_amnt',				type: 'flaot ', defaultValue : 0},		//
		{name: 'fcvr_strg',				type: 'string '},		//
		{name: 'scvr_strg',				type: 'string '},		//
		{name: 'bcvr_strg',				type: 'string '},		//
		{name: 'esti_amnt_covr',		type: 'flaot ', defaultValue : 0},		//
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
		{name: 'cover_count',			type: 'float'},		//
		{name: 'shet_count',			type: 'float'},		//
		{name: 'indx_count',			type: 'float'},		//
		{name: 'proc_count',			type: 'float'},		//
	],
//	idProperty: 'id'+'prnt_idcd'
});
