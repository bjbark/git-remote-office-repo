Ext.define( 'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerDetail', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'puch_sale_dvcd'		, type: 'string'	/* 매입매출구분코드	*/
		},{	name: 'invc_numb'			, type: 'string'	/* INVOICE번호		*/
		},{	name: 'line_seqn'			, type: 'float '	/* 순번				*/
		},{	name: 'acct_bacd'			, type: 'string'	/* 계정분류코드		*/
		},{	name: 'item_idcd'			, type: 'string'	/* 품목ID			*/
		},{	name: 'item_code'			, type: 'string'	/* 품목code			*/
		},{	name: 'item_name'			, type: 'string'	/* 품목명			*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격			*/
		},{	name: 'lott_numb'			, type: 'string'	/* LOT번호			*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 부가세포함여부		*/
		},{	name: 'vatx_rate'			, type: 'float '	/* 부가세율			*/
		},{	name: 'qntt'				, type: 'float '	/* 수량				*/
		},{	name: 'sply_amnt'			, type: 'float '	/* 공급가액			*/
		},{	name: 'vatx_amnt'			, type: 'float '	/* 부가세액			*/
		},{	name: 'ttsm_amnt'			, type: 'float '	/* 합계금액			*/
		},{	name: 'stnd_unit'			, type: 'string'	/* 기준단위			*/
		},{	name: 'unit_name'			, type: 'string'	/* 단위명			*/
		},{	name: 'stnd_unit_qntt'		, type: 'float '	/* 기준단위수량		*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고				*/
		},{	name: 'prof_data'			, type: 'string'	/* 증빙자료			*/
		},{	name: 'orig_invc_numb'		, type: 'string'	/* 원INVOICE번호		*/
		},{	name: 'orig_invc_seqn'		, type: 'float '	/* 원INVOICE순번		*/
		},{	name: 'orig_seqn'			, type: 'float '	/* 원순번			*/
		},{	name: 'sply_pric'			, type: 'float '	/* 단가				*/

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
