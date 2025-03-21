Ext.define( 'module.custom.iypkg.sale.sale.rqstwork.model.RqstWork', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'           , type: 'string'	/*	INVOICE번호	*/
		},{	name: 'line_seqn'           , type: 'string'	/*	순번		*/
		},{	name: 'acpt_numb'           , type: 'string'	/*	수주번호	*/
		},{	name: 'acpt_seqn'           , type: 'string'	/*	수주순번	*/
		},{	name: 'sale_date'			, type: 'string'	/*	청구일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'item_idcd'           , type: 'string'	/*	품목ID	*/
		},{	name: 'sale_unit'           , type: 'string'	/*	판매단위	*/
		},{	name: 'norm_sale_pric'      , type: 'string'	/*	정상판매단가	*/
		},{	name: 'sale_stnd_pric'      , type: 'string'	/*	판매기준단가	*/
		},{	name: 'sale_pric'           , type: 'string' 	/*	판매단가	*/
		},{	name: 'sale_qntt'           , type: 'string'	/*	판매수량	*/
		},{	name: 'porm_rate'           , type: 'string'	/*	가감율	*/
		},{	name: 'porm_qntt'           , type: 'string'	/*	가감수량	*/
		},{	name: 'real_sale_qntt'      , type: 'string'	/*	실판매수량	*/
		},{	name: 'vatx_incl_yorn'      , type: 'string'	/*	부가세포함여부	*/
		},{	name: 'vatx_rate'           , type: 'string'	/*	부가세율	*/
		},{	name: 'sale_amnt'           , type: 'string'	/*	판매금액	*/
		},{	name: 'vatx_amnt'           , type: 'string'	/*	부가세금액	*/
		},{	name: 'ttsm_amnt'           , type: 'string'	/*	합계금액	*/
		},{	name: 'dlvy_date'           , type: 'string'	/*	납품일자	*/
		},{	name: 'dlvy_hhmm'           , type: 'string'	/*	납품시분	*/
		},{	name: 'stnd_unit'           , type: 'string'	/*		*/
		},{	name: 'stnd_unit_qntt'      , type: 'string'	/*	기준단위수량	*/
		},{	name: 'wrhs_idcd'           , type: 'string'	/*	창고ID	*/
		},{	name: 'dlvy_cstm_idcd'      , type: 'string'	/*	납품거래처ID	*/
		},{	name: 'orig_invc_numb'      , type: 'string'	/*	원INVOICE번호	*/
		},{	name: 'orig_seqn'           , type: 'string'	/*	원순번	*/
		},{	name: 'pcod_numb'           , type: 'string'	/*	PONO	*/
		},{	name: 'prod_name'           , type: 'string'	/*	품명		*/
		},{	name: 'prod_leng'           , type: 'string'	/*	장		*/
		},{	name: 'prod_widh'           , type: 'string'	/*	폭		*/
		},{	name: 'prod_hght'           , type: 'string'	/*	고		*/
		},{	name: 'uper_seqn'           , type: 'string'	/*	상위순번	*/
		},{	name: 'disp_seqn'           , type: 'string'	/*	표시순번	*/
		},{	name: 'user_memo'           , type: 'string'	/*	사용자메모	*/
		},{	name: 'rnum'                , type: 'float' 	/* 순번			*/

		},{	name: 'prod_name'           , type: 'string'	/*	품명			*/
		},{	name: 'prod_code'           , type: 'string'	/*	품목코드		*/

		},{	name: 'ostt_qntt'           , type: 'string'	/*	출고수량		*/

		},{	name: 'invc_date'           , type: 'string'	/*	청구일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_name'           , type: 'string'	/*	거래처명		*/
		},{	name: 'cstm_idcd'           , type: 'string'	/*	거래처명		*/




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
