Ext.define('module.custom.sjflv.sale.sale.salecolt.model.SaleColtWorkerLister',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'			, type: 'string'	/* 발주번호		*/
		},{	name: 'istt_numb'			, type: 'string'	/* 	*/
		},{	name: 'new_invc_numb'		, type: 'string'	/* 	*/
		},{	name: 'new_line_seqn'		, type: 'string'	/* 발주순번		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 발주순번		*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_code'			, type: 'string'	/* 품목코드		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 품목명		*/

		},{	name: 'invc_date'			, type: 'string'	/* 		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'invc_date1'			, type: 'string'	/* 		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'invc_date2'			, type: 'string'	/* 		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'istt_date'			, type: 'string'	/* 		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'iomy_date'			, type: 'string'	/* 지급일자*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'publ_date'			, type: 'string'	/* 지급일자*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'stot_dvcd'			, type: 'string'	/* 결제구분	*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 담당자	*/
		},{	name: 'orig_invc_numb'		, type: 'string'	/* 입고번호		*/
		},{	name: 'orig_invc_seqn'		, type: 'float'		/* 입고번호		*/
		},{	name: 'sale_pric'			, type: 'float'		/* 공급가액		*/
		},{	name: 'sale_amnt'			, type: 'float'		/* 공급가액		*/
		},{	name: 'vatx_amnt'			, type: 'float'		/* 부가세액		*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 합계금액		*/
		},{	name: 'iomy_amnt'			, type: 'float'		/* 지급액		*/
		},{	name: 'qntt'				, type: 'float'		/* 수량		*/
		},{	name: 'pric'				, type: 'float'		/* 단가		*/
		},{	name: 'unpaid'				, type: 'float'		/* 미지급		*/
		},{	name: 'txbl_seqn'			, type: 'float'		/* 세금계산서순서	*/
		},{	name: 'txbl_numb'			, type: 'string'	/* 세금계산서번호	*/
		},{	name: 'paym_bank_name'		, type: 'string'	/* 지급은행명	*/
		},{	name: 'stot_bass'			, type: 'string'	/* 결제근거	*/
		},{	name: 'expr_date'			, type: 'string'	/* 만기일자	*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'sale_invc_numb'		, type: 'string'	/* 매출 invc번호	*/
		},{	name: 'rett_invc_numb'		, type: 'string'	/* 반품 invc번호	*/
		},{	name: 'rett_unpaid'			, type: 'float'	/* 반품 미지급금	*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고	*/

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
