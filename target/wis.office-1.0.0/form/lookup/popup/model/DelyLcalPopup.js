Ext.define('lookup.popup.model.DelyLcalPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'lcal_idcd'		, type: 'string' 	/* 지역ID		*/
		},{	name: 'lcal_name'		, type: 'string' 	/* 지역명		*/
		},{	name: 'lcal_code'		, type: 'string' 	/* 지역코드		*/
		},{	name: 'hdli_amnt'		, type: 'float' 	/* 택배금액		*/
		},{	name: 'trnt_cost_1fst'	, type: 'float' 	/* 운송비1		*/
		},{	name: 'trnt_cost_2snd'	, type: 'float' 	/* 운송비2		*/
		},{	name: 'trnt_cost_3trd'	, type: 'float' 	/* 운송비3		*/
		},{	name: 'user_memo'		, type: 'string' 	/* 사용자메모	*/
		},{	name: 'sysm_memo'		, type: 'string' 	/* 시스템메모	*/
		},{	name: 'prnt_idcd'		, type: 'string' 	/* 부모ID		*/
		},{	name: 'line_levl'		, type: 'float' 	/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'		, type: 'float' 	/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'		, type: 'string' 	/* ROW상태	*/ , defaultValue : '0'
		},{	name: 'line_clos'		, type: 'string' 	/* ROW마감	*/
		},{	name: 'find_name'		, type: 'string' 	/* 찾기명		*/
		},{	name: 'updt_user_name'	, type: 'string' 	/* 수정사용자명	*/
		},{	name: 'updt_ipad'		, type: 'string' 	/* 수정IP		*/
		},{	name: 'updt_dttm'		, type: 'string' 	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'		, type: 'string' 	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'		, type: 'string' 	/* 수정UI		*/
		},{	name: 'crte_user_name'	, type: 'string' 	/* 생성사용자명	*/
		},{	name: 'crte_ipad'		, type: 'string' 	/* 생성IP		*/
		},{	name: 'crte_dttm'		, type: 'string' 	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'		, type: 'string' 	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'		, type: 'string' 	/* 생성UI		*/
		}
	]
});