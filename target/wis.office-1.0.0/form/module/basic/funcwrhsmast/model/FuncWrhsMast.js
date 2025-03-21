Ext.define('module.basic.funcwrhsmast.model.FuncWrhsMast',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'from ('              , type: 'string' 	/* from (		*/
		},{	name: 'func_wrhs_idcd'      , type: 'string' 	/* 기능창고ID		*/
		},{	name: 'func_wrhs_code'      , type: 'string' 	/* 기능창고코드	*/
		},{	name: 'func_wrhs_name'      , type: 'string' 	/* 기능창고명		*/
		},{	name: 'mngt_wrhs_dvcd'      , type: 'string' 	/* 창고분류코드	*/
		},{	name: 'istt_insp_yorn'      , type: 'string' 	/* 입고검사여부	*/, defaultValue: '0'
		},{	name: 'poor_yorn'           , type: 'string' 	/* 불량여부		*/, defaultValue: '0'
		},{	name: 'prod_optn_yorn'      , type: 'string' 	/* 생산옵션여부	*/, defaultValue: '0'
		},{	name: 'dlvy_yorn'           , type: 'string' 	/* 적송여부		*/, defaultValue: '0'
		},{	name: 'sale_idle_yorn'      , type: 'string' 	/* 매출대기여부	*/, defaultValue: '0'
		},{	name: 'cspc_idle_yorn'      , type: 'string' 	/* 수탁매입대기여부	*/, defaultValue: '0'
		},{	name: 'sets_cnst_yorn'      , type: 'string' 	/* 세트구성여부	*/, defaultValue: '0'
		},{	name: 'issb_poor_yorn'      , type: 'string' 	/* 입고대기불량여부	*/, defaultValue: '0'
		},{	name: 'prod_cotr_yorn'      , type: 'string' 	/* 제품용기여부	*/, defaultValue: '0'
		},{	name: 'wdrw_cotr_yorn'      , type: 'string' 	/* 회수용기여부	*/, defaultValue: '0'
		},{	name: 'istt_idle_yorn'      , type: 'string' 	/* 입고대기여부	*/, defaultValue: '0'
		},{	name: 'puch_idle_yorn'      , type: 'string' 	/* 매입대기여부	*/, defaultValue: '0'
		},{	name: 'user_memo'           , type: 'string' 	/* 사용자메모		*/
		},{	name: 'sysm_memo'           , type: 'string' 	/* 시스템메모		*/
		},{	name: 'prnt_idcd'           , type: 'string' 	/* 부모ID		*/
		},{	name: 'line_levl'           , type: 'float' 	/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float' 	/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string' 	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string' 	/* ROW마감		*/
		},{	name: 'find_name'           , type: 'string' 	/* 찾기명			*/
		},{	name: 'updt_user_name'      , type: 'string' 	/* 수정사용자명	*/
		},{	name: 'updt_ipad'           , type: 'string' 	/* 수정IP		*/
		},{	name: 'updt_dttm'           , type: 'string' 	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'           , type: 'string' 	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'           , type: 'string' 	/* 수정UI		*/
		},{	name: 'crte_user_name'      , type: 'string' 	/* 생성사용자명	*/
		},{	name: 'crte_ipad'           , type: 'string' 	/* 생성IP		*/
		},{	name: 'crte_dttm'           , type: 'string' 	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'           , type: 'string' 	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'           , type: 'string' 	/* 생성UI		*/
		}
	]
});