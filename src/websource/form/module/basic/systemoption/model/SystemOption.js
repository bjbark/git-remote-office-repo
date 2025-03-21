Ext.define('module.basic.systemoption.model.SystemOption',{ extend:'Axt.data.Model',
	fields: [
		{name: 'prjt_idcd',			type: 'string'},	//프로젝트ID
		{name: 'hqof_idcd',			type: 'string'},	//본사ID
		{name: 'optn_idcd',			type: 'string'},	//옵션ID
		{name: 'optn_name',			type: 'string'},	//옵션명
		{name: 'clss_1fst',			type: 'string'},	//분류1
		{name: 'clss_2snd',			type: 'string'},	//분류2
		{name: 'clss_3trd',			type: 'string'},	//분류3
		{name: 'optn_desc',			type: 'string'},	//옵션설명
		{name: 'sysm_optn_dvcd',	type: 'string'},	//옵션구분
		{name: 'optn_logc_valu',	type: 'string'},	//옵션논리값
		{name: 'optn_yorn_valu',	type: 'string'},	//옵션여부값
		{name: 'optn_nmbr_valu',	type: 'float'},		//옵션숫자값
		{name: 'optn_char_valu',	type: 'string'},	//옵션문자값
		{name: 'optn_scpe_from',	type: 'float'},		//옵션범위부터
		{name: 'optn_scpe_util',	type: 'float'},		//옵션범위까지
		{name: 'optn_etcc',			type: 'string'},	//옵션기타
		{name: 'code_idcd',			type: 'string'},	//코드ID

		{name: 'user_memo',			type: 'string'},	//사용자메모
		{name: 'sysm_memo',			type: 'string'},	//시스템메모
		{name: 'prnt_idcd',			type: 'string'},	//부모ID
		{name: 'line_levl',			type: 'float'  , defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',			type: 'string'},	//ROW순서
		{name: 'line_stat',			type: 'string' , defaultValue: '0'},	//ROW상태
		{name: 'line_clos',			type: 'string'},	//ROW마감
		{name: 'find_name',			type: 'string'},	//찾기명
		{name: 'updt_user_name',	type: 'string'},	//수정사용자명
		{name: 'updt_ipad',			type: 'string'},	//수정IP
		{name: 'updt_dttm',			type: 'string'},	//수정일시
		{name: 'updt_idcd',			type: 'string'},	//수정ID
		{name: 'updt_urif',			type: 'string'},	//수정UI
		{name: 'crte_user_name',	type: 'string'},	//생성사용자명
		{name: 'crte_ipad',			type: 'string'},	//생성IP
		{name: 'crte_dttm',			type: 'string'},	//생성일시
		{name: 'crte_idcd',			type: 'string'},	//생성ID
		{name: 'crte_urif',			type: 'string'},	//생성UI
		{name: 'prnt_dept_code',	type: 'string'},	//상위부서코드
		{name: 'prnt_dept_name',	type: 'string'},	//상위부서명
	]
});
