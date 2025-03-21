Ext.define('module.mtrl.po.poisttwork.model.PoIsttWorkMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호	*/
		},{	name: 'invc_date'			, type: 'string' 	/* INVOICE일자	*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'
		},{	name: 'istt_wrhs_idcd'		, type: 'string'
		},{	name: 'istt_wrhs_name'		, type: 'string'
		},{	name: 'coun_iout_dvcd'		, type: 'string'
		},{	name: 'cstm_idcd'			, type: 'string'
		},{	name: 'drtr_idcd'			, type: 'string'
		},{	name: 'dept_idcd'			, type: 'string'
		},{	name: 'remk_text'			, type: 'string'
		},{	name: 'bzpl_name'			, type: 'string'
		},{	name: 'cstm_name'			, type: 'string'
		},{	name: 'drtr_name'			, type: 'string'
		},{	name: 'dept_name'			, type: 'string'
		},{	name: 'istt_qntt'			, type: 'float'
		},{	name: 'istt_vatx'			, type: 'float'
		},{	name: 'istt_amnt'			, type: 'float'
		},{	name: 'ttsm_amnt'			, type: 'float'
		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue : '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/ , defaultValue : '0'
		},{	name: 'find_name'			, type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: '_flag'				, type: 'string'
		},{	name: 'hqof_idcd'			, type: 'string', defaultValue : _global.hq_id
		}
	]
});