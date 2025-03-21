Ext.define('module.qc.insp.inspentry3.model.InspEntry3Master', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호*/
		},{	name: 'invc_date'			, type: 'string' 	/* INVOICE일자*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string' 	/* 사업장ID	*/
		},{	name: 'istt_wrhs_idcd'		, type: 'string' 	/* 입고창고ID	*/
		},{	name: 'istt_wrhs_name'		, type: 'string' 	/* 입고창고이름	*/
		},{	name: 'coun_iout_dvcd'		, type: 'string' 	/* 내외자구분코드	*/
		},{	name: 'cstm_idcd'			, type: 'string' 	/* 거래처ID	*/
		},{	name: 'drtr_idcd'			, type: 'string' 	/* 담당자ID	*/
		},{	name: 'dept_idcd'			, type: 'string' 	/* 부서ID		*/
		},{	name: 'remk_text'			, type: 'string' 	/* 비고		*/
		},{	name: 'bzpl_name'			, type: 'string' 	/* 사업장이름	*/
		},{	name: 'cstm_name'			, type: 'string' 	/* 거래처이름	*/
		},{	name: 'drtr_name'			, type: 'string' 	/* 담당자명		*/
		},{	name: 'dept_name'			, type: 'string' 	/* 부서명		*/
		},{	name: 'istt_qntt'			, type: 'float' 	/* 입고수량		*/
		},{	name: 'istt_vatx'			, type: 'float' 	/* 입고부가세	*/
		},{	name: 'istt_amnt'			, type: 'float' 	/* 입고금액		*/
		},{	name: 'ttsm_amnt'			, type: 'float' 	/* 합계금액		*/
		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue : '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/ , defaultValue : '0'
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
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