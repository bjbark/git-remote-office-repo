Ext.define('module.stock.isos.mtrlisttwork.model.MtrlIsttWorkMaster2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' },											/* INVOICE번호	*/
		{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	/* INVOICE일자	*/
		{	name: 'bzpl_idcd'			, type: 'string' },
		{	name: 'istt_wrhs_idcd'		, type: 'string' },
		{	name: 'istt_wrhs_name'		, type: 'string' },
		{	name: 'coun_iout_dvcd'		, type: 'string' },
		{	name: 'cstm_idcd'			, type: 'string' },
		{	name: 'drtr_idcd'			, type: 'string' },
		{	name: 'dept_idcd'			, type: 'string' },
		{	name: 'remk_text'			, type: 'string' },
		{	name: 'bzpl_name'			, type: 'string' },
		{	name: 'cstm_name'			, type: 'string' },
		{	name: 'drtr_name'			, type: 'string' },
		{	name: 'dept_name'			, type: 'string' },
		{	name: 'istt_dvcd'			, type: 'string' },
		{	name: 'krwn_pric'			, type: 'float'  },
		{	name: 'krwn_amnt'			, type: 'float'  },
		{	name: 'krwn_vatx'			, type: 'float'  },
		{	name: 'krwn_amnt_totl'		, type: 'float'  },
		{	name: 'istt_qntt'			, type: 'float'  },
		{	name: 'istt_vatx'			, type: 'float'  },
		{	name: 'istt_amnt'			, type: 'float'  },
		{	name: 'ttsm_amnt'			, type: 'float'  },
		{	name: 'stot_dvcd'			, type: 'string' },
		{	name: 'stot_bass'			, type: 'string' },
		{	name: 'paym_bank_name'		, type: 'string' },
		{	name: 'publ_date'			, type: 'string' },
		{	name: 'expr_date'			, type: 'string' },
		{	name: 'istt_insp_yorn'		, type: 'string' },
		{	name: 'user_memo'			, type: 'string' },											/* 사용자메모		*/
		{	name: 'sysm_memo'			, type: 'string' },											/* 시스템메모		*/
		{	name: 'prnt_idcd'			, type: 'string' },											/* 부모ID		*/
		{	name: 'line_levl'			, type: 'float'  , defaultValue: 0},						/* ROW레벨		*/
		{	name: 'line_ordr'			, type: 'float'  , defaultValue: 0},						/* ROW순서		*/
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},						/* ROW상태		*/
		{	name: 'line_clos'			, type: 'string' , defaultValue: '0'},						/* ROW마감		*/
		{	name: 'find_name'			, type: 'string' },											/* 찾기명			*/
		{	name: 'updt_user_name'		, type: 'string' },											/* 수정사용자명	*/
		{	name: 'updt_ipad'			, type: 'string' },											/* 수정IP		*/
		{	name: 'updt_dttm'			, type: 'string' , convert: Ext.util.Format.strToDateTime},	/* 수정일시		*/
		{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk},			/* 수정ID		*/
		{	name: 'updt_urif'			, type: 'string' },											/* 수정UI		*/
		{	name: 'crte_user_name'		, type: 'string' },											/* 생성사용자명	*/
		{	name: 'crte_ipad'			, type: 'string' },											/* 생성IP		*/
		{	name: 'crte_dttm'			, type: 'string' , convert: Ext.util.Format.strToDateTime},	/* 생성일시		*/
		{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk},			/* 생성ID		*/
		{	name: 'crte_urif'			, type: 'string' },											/* 생성UI		*/
		{	name: '_flag'				, type: 'string' },
		{	name: 'hqof_idcd'			, type: 'string' , defaultValue: _global.hq_id }
	]
});