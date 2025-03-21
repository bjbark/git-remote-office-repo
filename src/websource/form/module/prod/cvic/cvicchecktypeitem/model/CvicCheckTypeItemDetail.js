Ext.define('module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'chek_type_idcd'		, type: 'string'	//검사유형ID
		},{	name: 'line_seqn'			, type: 'float'		//순번
		},{	name: 'chek_sbsc_name'		, type: 'string'	//점검항목명
		},{	name: 'chek_mthd_dvcd'		, type: 'string'	//점검방법구분코드
		},{	name: 'chek_cond'			, type: 'string'	//점검조건
		},{	name: 'rslt_iput_dvcd'		, type: 'string'	//결과입력구분코드
		},{	name: 'msmt_mthd_dvcd'		, type: 'string'	//측정방법구분코드
		},{	name: 'goal_levl'			, type: 'string'	//목표수준
		},{	name: 'uppr_valu'			, type: 'string'	//상한값
		},{	name: 'lwlt_valu'			, type: 'string'	//하한값
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'uper_seqn'			, type: 'float'		//상위순번
		},{	name: 'disp_seqn'			, type: 'float'		//표시순번
		},{name: 'chek_type_code'		, type: 'string'	//점검유형코드
		},{name: 'chek_type_name'		, type: 'string'	//점검유형명
		},{name: 'chek_mthd_dvcd'		, type: 'string'	//점검방법구분코드
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'	//찾기명
		},{	name: 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	//수정UI
		},{	name: 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'	//생성UI
		}
	],
});