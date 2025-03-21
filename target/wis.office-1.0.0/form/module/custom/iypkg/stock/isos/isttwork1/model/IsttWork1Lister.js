Ext.define( 'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1Lister', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 번호		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 보조순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 발주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'prod_name'			, type: 'string'	/* 수주품명		*/
		},{	name: 'acpt_invc_numb'		, type: 'string'	/* 수주번호		*/
		},{	name: 'acpt_line_seqn'		, type: 'float'		/* 수주순번		*/
		},{	name: 'acpt_cstm_name'		, type: 'string'	/* 수주처		*/

		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'invc_date'			, type: 'string'	/* 입고일		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'istt_qntt'			, type: 'string'	/* 입고량		*/
		},{	name: 'istt_qntt2'			, type: 'string'	/* 입고량(원본)		*/
		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'fabc_code'			, type: 'string'	/* 원단코드		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'item_spec'			, type: 'string'	/* 원단사이즈	*/
		},{	name: 'fdat_spec'			, type: 'string'	/* 재단규격		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'item_fxqt'			, type: 'string'	/* 절수		*/
		},{	name: 'subt_qntt'			, type: 'float' 	/* 감량		*/
		},{	name: 'mxm2_pric'			, type: 'string' 	/* 제곱미터단가	*/
		},{	name: 'pqty_pric'			, type: 'string' 	/* 개당단가		*/
		},{	name: 'istt_amnt'			, type: 'string' 	/* 공급가액		*/
		},{	name: 'istt_vatx'			, type: 'string' 	/* 부가세액		*/
		},{	name: 'ttsm_amnt'			, type: 'string' 	/* 합계액		*/
		},{	name: 'scre_spec_frml'		, type: 'string' 	/* 재단및스코어	*/
		},{	name: 'item_leng'			, type: 'float' 	/* 장		*/
		},{	name: 'item_widh'			, type: 'float' 	/* 폭		*/
		},{	name: 'rnum'				, type: 'string'
		},{	name: 'deli_date'			, type: 'string'	/* 납기일		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr

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
