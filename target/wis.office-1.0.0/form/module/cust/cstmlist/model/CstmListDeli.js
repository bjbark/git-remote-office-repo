Ext.define( 'module.cust.cstmlist.model.CstmListDeli', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'		, type: 'string'					/* 거래처ID */
		},{	name: 'line_seqn'		, type: 'float'	, defaultValue : 0	/* 순번 */
		},{	name: 'dlvy_drtr_name'	, type: 'string'					/* 납품담당자명 */
		},{	name: 'trnt_mean_dvcd'	, type: 'string'					/* 운송수단구분코드 */
		},{	name: 'dlvy_tele_numb'	, type: 'string'					/* 배송전화번호 */
		},{	name: 'dlvy_hdph_numb'	, type: 'string'					/* 납품휴대폰번호 */
		},{	name: 'dlvy_faxi_numb'	, type: 'string'					/* 납품팩스번호 */
		},{	name: 'dlvy_mail_addr'	, type: 'string'					/* 납품이메일주소 */
		},{	name: 'dlvy_zpcd'		, type: 'string'					/* 배송우편번호 */
		},{	name: 'dlvy_addr_1fst'	, type: 'string'					/* 배송주소1 */
		},{	name: 'dlvy_addr_2snd'	, type: 'string'					/* 배송주소2 */
		},{	name: 'dlvy_remk_text'	, type: 'string'					/* 납품비고 */
		},{	name: 'dlvy_lcal_dvcd'	, type: 'string'					/* 배송지역구분코드 */
		},{	name: 'rpst_dlvy_yorn'	, type: 'string'					/* 대표납품여부 */
		},{	name: 'user_memo'		, type: 'string'					/* 사용자메모 */
		},{	name: 'sysm_memo'		, type: 'string'					/* 시스템메모 */
		},{	name: 'prnt_idcd'		, type: 'string'					/* 부모ID */
		},{	name: 'line_levl'		, type: 'float'	, defaultValue : 0	/* ROW레벨 */
		},{	name: 'line_ordr'		, type: 'float'	, defaultValue : 0	/* ROW순서 */
		},{	name: 'line_stat'		, type: 'string', defaultValue : '0'/* ROW상태 */
		},{	name: 'line_clos'		, type: 'string'					/* ROW마감 */
		},{	name: 'find_name'		, type: 'string'					/* 찾기명 */
		},{	name: 'updt_user_name'	, type: 'string'					/* 수정사용자명 */
		},{	name: 'updt_ipad'		, type: 'string'					/* 수정IP */
		},{	name: 'updt_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime 	/* 수정일시 */
		},{	name: 'updt_idcd'		, type: 'string', defaultValue : _global.login_pk			/* 수정ID */
		},{	name: 'updt_urif'		, type: 'string'					/* 수정UI */
		},{	name: 'crte_user_name'	, type: 'string'					/* 생성사용자명 */
		},{	name: 'crte_ipad'		, type: 'string'					/* 생성IP */
		},{	name: 'crte_dttm'		, type: 'string', convert : Ext.util.Format.strToDateTime	/* 생성일시 */
		},{	name: 'crte_idcd'		, type: 'string', defaultValue : _global.login_pk			/* 생성ID */
		},{	name: 'crte_urif'		, type: 'string'					/* 생성UI */
		}
	]
});

