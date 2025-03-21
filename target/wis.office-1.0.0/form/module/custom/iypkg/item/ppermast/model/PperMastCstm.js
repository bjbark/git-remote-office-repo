Ext.define( 'module.custom.iypkg.item.ppermast.model.PperMastCstm', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'pper_idcd'			, type: 'string'	/* 원지ID		*/
		},{	name: 'line_seqn'			, type: 'float' 	/* 순번			*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드		*/
		},{	name: 'adpt_date'			, type: 'string'	/* 적용일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bxsw_loss'			, type: 'float' 	/* swloss		*/
		},{	name: 'bxdw_loss'			, type: 'float' 	/* dwloss		*/
		},{	name: 'bxtw_loss'			, type: 'float' 	/* twloss		*/
		},{	name: 'bxaa_loss'			, type: 'float' 	/* aa골loss		*/
		},{	name: 'bxee_loss'			, type: 'float' 	/* e골loss		*/
		},{	name: 'bxsw_make_cost'		, type: 'float' 	/* sw가공비		*/
		},{	name: 'bxdw_make_cost'		, type: 'float' 	/* dw가공비		*/
		},{	name: 'bxtw_make_cost'		, type: 'float' 	/* tw가공비		*/
		},{	name: 'bxaa_make_cost'		, type: 'float' 	/* aa골가공비		*/
		},{	name: 'bxee_make_cost'		, type: 'float' 	/* e골가공비		*/

		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/ , defaultValue : 0
		},{	name: 'disp_seqn'			, type: 'float'		/* 표시순번		*/ , defaultValue : 0
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
		}
	]
});
