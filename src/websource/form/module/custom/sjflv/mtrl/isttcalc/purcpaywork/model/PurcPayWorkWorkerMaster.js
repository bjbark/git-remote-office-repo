Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkWorkerMaster',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'			, type: 'string'	/* 발주번호		*/
		},{	name: 'new_invc_numb'		, type: 'string'	/* 	*/
		},{	name: 'invc_date'			, type: 'string'	/* 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'iomy_date'			, type: 'string'	/* 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'publ_date'			, type: 'string'	/* 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'stot_dvcd'			, type: 'string'	/* 	*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 	*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 	*/
		},{	name: 'dept_idcd'			, type: 'string'	/* 	*/
		},{	name: 'paym_bank_name'		, type: 'string'	/* 	*/
		},{	name: 'stot_bass'			, type: 'string'	/* 	*/
		},{	name: 'expr_date'			, type: 'string'	/* 	*/
		},{	name: 'total_amnt'			, type: 'float'	/* 	*/



		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/
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
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	]
});
