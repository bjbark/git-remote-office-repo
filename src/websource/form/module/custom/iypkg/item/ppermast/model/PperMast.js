Ext.define( 'module.custom.iypkg.item.ppermast.model.PperMast', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'pper_idcd'			, type: 'string'	/* 원지ID		*/
		},{	name: 'pper_code'			, type: 'string'	/* 원지코드		*/
		},{	name: 'pper_name'			, type: 'string'	/* 원지명			*/
		},{	name: 'pnyg_volm'			, type: 'float'		/* 평량			*/
		},{	name: 'tons_pric'			, type: 'float'		/* 톤단가			*/
		},{	name: 'kgrm_pric'			, type: 'float'		/* 키로그램단가	*/
		},{	name: 'mxm2_pric'			, type: 'float'		/* 제곱미터단가	*/
		},{	name: 'stnd_leng'			, type: 'float'		/* 표준길이		*/
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
