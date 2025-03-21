Ext.define( 'module.cust.cstmlist.model.CstmListDrtr', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'           , type: 'string'	/* 고객ID		*/
		},{	name: 'line_seqn'           , type: 'float'		/* 순번			*/ , defaultValue : 0
		},{	name: 'drtr_name'           , type: 'string'	/* 담당자명		*/
		},{	name: 'wkps_name'           , type: 'string'	/* 직위명			*/
		},{	name: 'dept_name'           , type: 'string'	/* 부서명			*/
		},{	name: 'drtr_tele_numb'      , type: 'string'	/* 전화번호		*/
		},{	name: 'drtr_hdph_numb'      , type: 'string'	/* 휴대폰번호		*/
		},{	name: 'drtr_faxi_numb'      , type: 'string'	/* 팩스번호		*/
		},{	name: 'drtr_mail_addr'      , type: 'string'	/* 이메일주소		*/
		},{	name: 'remk_text'           , type: 'string'	/* 비고			*/
		},{	name: 'drtr_dvcd'           , type: 'string'	/* 담당자구분코드	*/
		},{	name: 'rpst_drtr_yorn'      , type: 'string'	/* 대표담당자여부	*/
		},{	name: 'uper_seqn'           , type: 'float'		/* 상위순번		*/ , defaultValue : 0
		},{	name: 'disp_seqn'           , type: 'float'		/* 표시순번		*/ , defaultValue : 0
		},{	name: 'user_memo'           , type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'           , type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'           , type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'           , type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'           , type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'      , type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'           , type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'           , type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'           , type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'           , type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'      , type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'           , type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'           , type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'           , type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		}
	]
});
