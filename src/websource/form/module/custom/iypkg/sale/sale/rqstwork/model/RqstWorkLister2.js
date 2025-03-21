Ext.define( 'module.custom.iypkg.sale.sale.rqstwork.model.RqstWorkLister2', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 청구번호		*/
		},{	name: 'line_seqn'			, type: 'float' 	/* 청구순번		*/
		},{	name: 'new_invc_numb'		, type: 'string'	/* 새로운 청구번호	*/
		},{	name: 'new_line_seqn'		, type: 'float' 	/* 새로운 청구순번	*/
		},{	name: 'invc_date'			, type: 'string'	/* 청구일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'ostt_date'			, type: 'string'	/* 출고일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID		*/
		},{	name: 'expt_dvcd'			, type: 'string'	/* 수출구분		*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'item_idcd'			, type: 'string'	/* 제품ID		*/
		},{	name: 'prod_code'			, type: 'string'	/* 제품코드		*/
		},{	name: 'item_name'			, type: 'string'	/* 품명			*/
		},{	name: 'ostt_dvcd'			, type: 'string'	/* 출고구분		*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 작업자ID		*/ , defaultValue : _global.login_pk
		},{	name: 'dept_idcd'			, type: 'string'	/* 부서ID		*/
		},{	name: 'trut_dvcd'			, type: 'string'	/* 위탁구분		*/
		},{	name: 'dlvy_cond_dvcd'		, type: 'string'	/* 인도조건구분	*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'sale_stor_yorn'		, type: 'string'	/* 판매보관여부	*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 부가세포함여부	*/ , defaultValue : 1
		},{	name: 'acpt_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'prod_name'			, type: 'string'	/* 제품명			*/
		},{	name: 'prod_leng'			, type: 'string' 	/* 장			*/
		},{	name: 'prod_widh'			, type: 'string' 	/* 폭			*/
		},{	name: 'prod_hght'			, type: 'string' 	/* 고			*/
		},{	name: 'ostt_qntt'			, type: 'string'	/* 출고수량		*/
		},{	name: 'unpaid'				, type: 'float' 	/* 미청구수량		*/
		},{	name: 'sale_qntt'			, type: 'float'		/* 청구수량		*/
		},{	name: 'sale_pric'			, type: 'string' 	/* 판매단가		*/
		},{	name: 'sale_amnt'			, type: 'float' 	/* 공급가액		*/
		},{	name: 'vatx_amnt'			, type: 'float' 	/* 부가세	액		*/
		},{	name: 'ttsm_amnt'			, type: 'float' 	/* 합계금액		*/
		},{	name: 'uper_seqn'			, type: 'float' 	/* 이전순번		*/
		},{	name: 'disp_seqn'			, type: 'float' 	/* 표시순번		*/
		},{	name: 'acpt_dvcd'			, type: 'string'	/* 수주구분		*/
		},{	name: 'crny_dvcd'			, type: 'string'	/* 통화구분		*/
		},{	name: 'orig_invc_numb'		, type: 'string'	/* 원 invoice 번호*/
		},{	name: 'orig_seqn'			, type: 'float' 	/* 원 순번		*/
		},{	name: 'rnum'				, type: 'float' 	/* 순번			*/

		},{	name: 'rqod_rcvd_dvcd'		, type: 'string' 	/* 영수구분		*/
		},{	name: 'porm_rate'			, type: 'float' 	/* 가감율			*/
		},{	name: 'porm_qntt'			, type: 'float' 	/* 가감수량		*/
		},{	name: 'real_sale_qntt'		, type: 'float' 	/* 실판매수량		*/

		},{	name: 'pcod_numb'			, type: 'string' 	/* PONO			*/

		},{	name: 'user_memo'           , type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'           , type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'           , type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'           , type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'           , type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'      , type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'           , type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'           , type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'           , type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'           , type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'      , type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'           , type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'           , type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'           , type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		}
	]
});
