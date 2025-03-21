Ext.define( 'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerMaster2', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* INVOICE번호		*/
		},{	name: 'invc_date'			, type: 'string'	/* INVOICE일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID			*/
		},{	name: 'bzpl_name'			, type: 'string'	/* 사업장ID			*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID			*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처ID			*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처ID			*/




		},{	name: 'expt_dvcd'			, type: 'string'	/* 수출구분코드		*/
		},{	name: 'ostt_dvcd'			, type: 'string'	/* 출고구분코드		*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 담당자ID			*/
		},{	name: 'drtr_name'			, type: 'string'	/* 담당자ID			*/
		},{	name: 'dept_idcd'			, type: 'string'	/* 부서ID			*/
		},{	name: 'trut_dvcd'			, type: 'string'	/* 위탁구분코드		*/
		},{	name: 'dlvy_cond_dvcd'		, type: 'string'	/* 인도조건구분코드	*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'sale_stor_yorn'		, type: 'string'	/* 판매보관여부		*/
		},{	name: 'crny_dvcd'			, type: 'string'	/* 통화구분코드		*/
		},{	name: 'excg_rate'			, type: 'float '	/* 환율				*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고				*/


		},{	name: 'dept_name'			, type: 'string'	/* 비고				*/
		},{	name: 'buss_numb'			, type: 'string'	/* 비고				*/
		},{	name: 'tele_numb'			, type: 'string'	/* 비고				*/
		},{	name: 'mail_addr'			, type: 'string'	/* 비고				*/




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
