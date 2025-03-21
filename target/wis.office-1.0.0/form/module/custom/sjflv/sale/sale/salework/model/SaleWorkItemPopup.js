Ext.define( 'module.custom.sjflv.sale.sale.salework.model.SaleWorkItemPopup', { extend : 'Axt.data.Model',
	fields  : [
	   		{	name: 'invc_numb'			, type: 'string'	/* INVOICE번호	*/
	   		},{	name: 'new_invc_numb'		, type: 'string'	/* 저장INVOCE번호*/
	   		},{	name: 'line_seqn'			, type: 'float '	/* 순번			*/
	   		},{	name: 'chk'					, type: 'float '	/* master chk용도*/
	   		},{	name: 'num'					, type: 'float '	/* 합계확인용		*/
	   		},{	name: 'invc_date'			, type: 'string'	/* INVOICE일자	*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
	   		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID		*/
	   		},{	name: 'cstm_code'			, type: 'string'	/* 거래처CODE	*/
	   		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
	   		},{	name: 'item_idcd'			, type: 'string'	/* 품목ID		*/
	   		},{	name: 'item_code'			, type: 'string'	/* 품목CODE		*/
	   		},{	name: 'item_name'			, type: 'string'	/* 품명			*/
	   		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
	   		},{	name: 'sale_unit'			, type: 'string'	/* 판매단위코드	*/
	   		},{	name: 'unit_name'			, type: 'string'	/* 단위명		*/
	   		},{	name: 'ostt_qntt'			, type: 'float'		/* 출고수량		*/
	   		},{	name: 'sale_pric'			, type: 'float'		/* 판매단가		*/
	   		},{	name: 'sale_amnt'			, type: 'float'		/* 판매금액		*/
	   		},{	name: 'deff_amnt'			, type: 'float'		/* 미발행금액		*/
	   		},{	name: 'sply_amnt'			, type: 'float'		/* 발행금액		*/
	   		},{	name: 'vatx_amnt'			, type: 'float'		/* 부가세		*/
	   		},{	name: 'ttsm_amnt'			, type: 'float'		/* 합계금액	*/
	   		},{	name: 'amnt'				, type: 'float'		/* 공급가		*/ , defaultValue : 0
	   		},{	name: 'vatx'				, type: 'float'		/* 부가세		*/ , defaultValue : 0
	   		},{	name: 'sply'				, type: 'float'		/* 발행금액		*/ , defaultValue : 0
	   		},{	name: 'ttsm'				, type: 'float'		/* 합계			*/ , defaultValue : 0
	   		},{	name: 'mail_addr'			, type: 'string'	/* 메일			*/
	   		},{	name: 'tele_numb'			, type: 'string'	/* 전화번호		*/

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
	   		},{	name: 'qntt'				, type: 'float'		/* 생성UI		*/
	   		},{	name: 'sply_pric'			, type: 'float'		/* 생성UI		*/
	   		},{	name: 'sply_amnt'			, type: 'float'		/* 생성UI		*/
	   		},{	name: 'vatx_amnt'			, type: 'float'		/* 생성UI		*/
	   		}
	   	]
});
