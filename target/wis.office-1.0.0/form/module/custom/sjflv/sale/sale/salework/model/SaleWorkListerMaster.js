Ext.define( 'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerMaster', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'puch_sale_dvcd'		, type: 'string'	/* 매입매출구분코드	*/
		},{	name: 'invc_numb'			, type: 'string'	/* INVOICE번호		*/
		},{	name: 'invc_date'			, type: 'string'	/* INVOICE일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID			*/
		},{	name: 'bzpl_name'			, type: 'string'	/* 사업장ID			*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID			*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처ID			*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처ID			*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 담당자ID			*/
		},{	name: 'dept_idcd'			, type: 'string'	/* 부서ID			*/
		},{	name: 'sply_amnt'			, type: 'float '	/* 공급가액			*/
		},{	name: 'vatx_amnt'			, type: 'float '	/* 부가세액			*/
		},{	name: 'ttsm_amnt'			, type: 'float '	/* 합계금액			*/
		},{	name: 'rqod_rcvd_dvcd'		, type: 'string'	/* 청구영수구분코드	*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고				*/
		},{	name: 'stot_date'			, type: 'string'	/* 결제일자			*/
		},{	name: 'stot_dvcd'			, type: 'string'	/* 결제구분코드		*/
		},{	name: 'stot_bass'			, type: 'string'	/* 결제근거			*/
		},{	name: 'paym_bank_name'		, type: 'string'	/* 지급은행명			*/
		},{	name: 'publ_date'			, type: 'string'	/* 발행일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'expr_date'			, type: 'string'	/* 만기일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'trsm_yorn'			, type: 'string'	/* 전송여부			*/, defaultValue:'0'
		},{	name: 'trsm_dttm'			, type: 'string'	/* 전송일시			*/, convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.strToDateTime
		},{	name: 'trsm_idcd'			, type: 'string'	/* 전송ID			*/
		},{	name: 'trsm_dvcd'			, type: 'string'	/* 전송ID			*/
		},{	name: 'uper_seqn'			, type: 'float '	/* 상위순번			*/
		},{	name: 'disp_seqn'			, type: 'float '	/* 표시순번			*/
		},{	name: 'buss_numb'			, type: 'string'	/* 			*/
		},{	name: 'buss_name'			, type: 'string'	/* 			*/
		},{	name: 'boss_name'			, type: 'string'	/* 			*/
		},{	name: 'buss_type'			, type: 'string'	/* 			*/
		},{	name: 'buss_kind'			, type: 'string'	/* 			*/
		},{	name: 'drtr_name'			, type: 'string'	/* 거래처 담당자명		*/
		},{	name: 'tele_numb'			, type: 'string'	/* 거래처 연락처			*/
		},{	name: 'mail_addr'			, type: 'string'	/* 거래처 이메일주소		*/
		},{	name: 'cstm_addr'			, type: 'string'	/* 			*/
		},{	name: 'bzpl_buss_numb'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_buss_name'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_boss_name'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_buss_type'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_buss_kind'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_drtr_name'		, type: 'string',defaultValue:_global.login_nm	/* 			*/
		},{	name: 'bzpl_tele_numb'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_mail_addr'		, type: 'string'	/* 			*/
		},{	name: 'bzpl_addr'			, type: 'string'	/* 			*/
		},{	name: 'vatx_dvcd'			, type: 'string'	/* 			*/
		},{	name: 'baro_stat'			, type: 'string'	/* 	세금계산서 상태	*/

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
