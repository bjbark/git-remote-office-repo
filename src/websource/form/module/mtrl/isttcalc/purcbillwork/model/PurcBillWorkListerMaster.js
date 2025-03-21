Ext.define( 'module.mtrl.isttcalc.purcbillwork.model.PurcBillWorkListerMaster', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	/* 번호		*/
		},{	name: 'invc_date'		, type: 'string'	/* 접수일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_code'		, type: 'string'	/* 거레처코드	*/
		},{	name: 'cstm_name'		, type: 'string'	/* 거래처명		*/
		},{	name: 'mail_addr'		, type: 'string'	/* 메일		*/
		},{	name: 'publ_date'		, type: 'float'		/* 발행일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'rqod_rcvd_dvcd'	, type: 'string'	/* 영수/청구	*/
		},{	name: 'dept_name'		, type: 'string'	/* 부서명		*/
		},{	name: 'user_name'		, type: 'string'	/* 담당자		*/
		},{	name: 'sply_amnt'		, type: 'float'		/* 공급가		*/ , defaultValue : 0
		},{	name: 'vatx_amnt'		, type: 'float'		/* 부가세		*/ , defaultValue : 0
		},{	name: 'ttsm_amnt'		, type: 'float'		/* 합계금액		*/ , defaultValue : 0

		},{	name: 'user_memo'		, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'		, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'		, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'		, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'		, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'		, type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'		, type: 'string'	/* ROW마감	*/
		},{	name: 'find_name'		, type: 'string'	/* 찾기명		*/
		},{	name: 'updt_user_name'	, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'		, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'		, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'		, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'		, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'	, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'		, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'		, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'		, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'		, type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'		, type: 'string'	/* 생성UI		*/
		}
	]
});
