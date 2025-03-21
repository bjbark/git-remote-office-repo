Ext.define( 'module.custom.iypkg.stock.isos.saleostt2.model.SaleOstt2Lister', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 번호		*/
		},{	name: 'new_invc_numb'		, type: 'string' 	/* 순번		*/
		},{	name: 'line_seqn'			, type: 'float' 	/* 순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 출고일자	*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID*/
		},{	name: 'expt_dvcd'			, type: 'string'	/* 수출구분	*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명	*/
		},{	name: 'cstm_idcd2'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_code2'			, type: 'string'	/* 거래처코드	*/
		},{	name: 'cstm_name2'			, type: 'string'	/* 거래처명	*/
		},{	name: 'item_idcd'			, type: 'string'	/* 제품ID	*/
		},{	name: 'item_code'			, type: 'string'	/* 제품코드	*/
		},{	name: 'item_idcd2'			, type: 'string'	/* 제품ID	*/
		},{	name: 'item_code2'			, type: 'string'	/* 제품코드	*/
		},{	name: 'ostt_dvcd'			, type: 'string'	/* 출고구분	*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 작업자ID	*/
		},{	name: 'dept_idcd'			, type: 'string'	/* 부서ID	*/
		},{	name: 'trut_dvcd'			, type: 'string'	/* 위탁구분	*/
		},{	name: 'dlvy_cond_dvcd'		, type: 'string'	/* 인도조건구분*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자	*/
		},{	name: 'sale_stor_yorn'		, type: 'string'	/* 판매보관여부*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 부가세포함여부*/
		},{	name: 'acpt_numb'			, type: 'string'	/* 수주번호	*/
		},{	name: 'prod_name'			, type: 'string'	/* 제품명		*/
		},{	name: 'porm_qntt'			, type: 'float' 	/* 가감수량	*/
		},{	name: 'prod_leng'			, type: 'float' 	/* 장		*/
		},{	name: 'prod_widh'			, type: 'float' 	/* 폭		*/
		},{	name: 'prod_hght'			, type: 'float' 	/* 고		*/
		},{	name: 'ostt_qntt'			, type: 'float' 	/* 출고수량	*/
		},{	name: 'sale_pric'			, type: 'float' 	/* 판매금액	*/
		},{	name: 'sale_amnt'			, type: 'float' 	/* 공급가		*/
		},{	name: 'vatx_amnt'			, type: 'float' 	/* 부가세		*/
		},{	name: 'ttsm_amnt'			, type: 'float' 	/* 합계금액	*/
		},{	name: 'acpt_dvcd'			, type: 'string'	/* 수주구분	*/
		},{	name: 'crny_dvcd'			, type: 'string'	/* 통화구분	*/
		},{	name: 'pqty_pric'			, type: 'float' 	/* 단가/개	*/
		},{	name: 'drtr_name'			, type: 'string'	/* 작업자명		*/
		},{	name: 'cars_alis'			, type: 'string'	/* 차량명		*/
		},{	name: 'nwek_name'			, type: 'string'	/* 차주명		*/
		},{	name: 'assi_cstm_idcd'		, type: 'string'	/* 납품처ID	*/
		},{	name: 'dlvy_drtr_name'		, type: 'string'	/* 납품처명		*/




		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'excg_rate'			, type: 'string'	/* 환율		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID	*/
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
	],
});
