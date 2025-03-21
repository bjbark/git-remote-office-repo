Ext.define( 'module.custom.sjflv.cust.cstmmast.model.CstmMastBank', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'		, type: 'string'					/* 거래처ID */
		},{	name: 'line_seqn'		, type: 'float'	, defaultValue : 0	/* 순번 */
		},{	name: 'bank_name'		, type: 'string'					/* 은행명 */
		},{	name: 'acct_nmbr'		, type: 'string'					/* 계좌번호 */
		},{	name: 'rpst_acct_yorn'	, type: 'string'					/* 대표계좌여부 */
		},{	name: 'addr_name'		, type: 'string'					/* 은행주소 */

		},{	name: 'user_memo_bank'	, type: 'string'					/* 사용자메모 */
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

