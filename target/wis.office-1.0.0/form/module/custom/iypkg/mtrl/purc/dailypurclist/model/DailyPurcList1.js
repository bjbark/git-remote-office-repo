Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.model.DailyPurcList1', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'invc_date'			, type: 'string'	/* 매입일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_name'			, type: 'string'	/* 매입처명		*/
		},{	name: 'ppkd_dvcd'			, type: 'string'	/* 지종분류코드	*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'item_fxqt'			, type: 'string'	/* 절수		*/
		},{	name: 'istt_qntt'			, type: 'float'		/* 입고량		*/ , defaultValue : 0
		},{	name: 'mxm2_pric'			, type: 'string'	/* m2단가		*/
		},{	name: 'pqty_pric'			, type: 'string'	/* 단가		*/
		},{	name: 'istt_amnt'			, type: 'float'		/* 공급가액		*/ , defaultValue : 0
		},{	name: 'alm2_pric'			, type: 'float'		/* 총m2		*/
		},{	name: 'acpt_cstm_name'		, type: 'string'	/* 수주처명		*/
		},{	name: 'prod_name'			, type: 'string'	/* 품명		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'cost_amnt'			, type: 'string'	/* 원가율		*/
		},{	name: 'rnum'				, type: 'float'

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