Ext.define( 'module.custom.iypkg.item.productmast.model.ProductMastPric', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'prod_idcd'			, type: 'string'		/* 제품ID		*/
		},{	name: 'line_seqn'			, type: 'float '		/* 순번			*/, defaultValue : 0
		},{	name: 'cstm_idcd'			, type: 'string'		/* 거래처ID		*/
		},{	name: 'cstm_name'			, type: 'string'		/* 거래처명		*/
		},{	name: 'adpt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//적용일자
		},{	name: 'sale_pric'			, type: 'float '		/* 판매단가		*/, defaultValue : 0
		},{	name: 'befr_pric'			, type: 'float '		/* 전단가		*/, defaultValue : 0

		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/
		},{	name: 'disp_seqn'			, type: 'float'		/* 하위순번		*/
		},{	name: 'change'				, type: 'string'	/* 변경			*/
		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/
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
