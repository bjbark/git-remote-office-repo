Ext.define( 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.model.PurcPayWorkListerMaster', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'iomy_dvcd'			, type: 'string'	/* 입출금구분코드	*/
		},{	name: 'invc_numb'			, type: 'float '	/* INVOICE번호	*/
		},{	name: 'invc_date'			, type: 'string'	/* INVOICE일자	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'dept_idcd'			, type: 'string'	/* 부서ID		*/
		},{	name: 'dept_name'			, type: 'string'	/* 부서ID		*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 담당자ID		*/
		},{	name: 'drtr_name'			, type: 'string'	/* 담당자ID		*/
		},{	name: 'iomy_date'			, type: 'string'	/* 입출금일자		*/
		},{	name: 'stot_dvcd'			, type: 'string'	/* 결제구분코드	*/
		},{	name: 'stot_bass'			, type: 'string'	/* 결제근거		*/
		},{	name: 'publ_date'			, type: 'string'	/* 발행일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'expr_date'			, type: 'string'	/* 만기일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'paym_bank_name'		, type: 'string'	/* 지급은행명		*/
		},{	name: 'apvl_yorn'			, type: 'string'	/* 승인여부		*/
		},{	name: 'apvl_drtr_idcd'		, type: 'string'	/* 승인담당자ID	*/
		},{	name: 'apvl_date'			, type: 'string'	/* 승인일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'plan_date'			, type: 'string'	/* 계획일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'plan_amnt'			, type: 'float '	/* 계획금액		*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고			*/

		},{	name: 'sply_amnt'			, type: 'float '	/* 금액			*/, defaultValue : 0
		},{	name: 'vatx_amnt'			, type: 'float '	/* 부가세		*/, defaultValue : 0
		},{	name: 'ttsm_amnt'			, type: 'float '	/* 합계금액		*/, defaultValue : 0

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/
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
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	]
});
