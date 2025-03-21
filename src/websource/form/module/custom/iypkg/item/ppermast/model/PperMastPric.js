Ext.define( 'module.custom.iypkg.item.ppermast.model.PperMastPric', { extend : 'Axt.data.Model',
	fields: [
			{	name: 'pper_idcd'			, type: 'string'	/* 원지ID  */
			},{	name: 'line_seqn'			, type: 'float' 	/* 순번     */
			},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID*/
			},{	name: 'cstm_name'			, type: 'string'	/* 거래처명 */
			},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드*/
			},{	name: 'adpt_date'			, type: 'string' , convert : Ext.util.Format.dateToStr, serialize: Ext.util.Format.dateToStr	/* 적용일자 */
			},{	name: 'chag_date'			, type: 'string'	/* 변경일자 */
			},{	name: 'kgrm_pric2'			, type: 'float' 	/* KG단가 */
			},{	name: 'tons_pric2'			, type: 'float' 	/* 톤단가 */
			},{	name: 'befr_tons_pric'		, type: 'float' , defaultValue : 0	/* 이전톤단가 */
			},{	name: 'befr_kgrm_pric'		, type: 'float' , defaultValue : 0	/* 이전KG단가 */
			},{	name: 'last_yorn'			, type: 'float' 	/* 최종여부 */
			},{	name: 'uper_seqn'			, type: 'float' 	/* 상위순번 */
			},{	name: 'disp_seqn'			, type: 'float' 	/* 하위순번 */
			},{	name: 'user_memo'			, type: 'string'	/* 사용자메모 */
			},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모 */
			},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID */
			},{	name: 'line_levl'			, type: 'float' , defaultValue : 0	/* ROW레벨 */
			},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0	/* ROW순서 */
			},{	name: 'line_stat'			, type: 'string', defaultValue : '0'/* ROW상태 */
			},{	name: 'line_clos'			, type: 'string'	/* ROW마감 */
			},{	name: 'find_name'			, type: 'string'	/* 찾기명 */
			},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명 */
			},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP */
			},{	name: 'updt_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime 	/* 수정일시 */
			},{	name: 'updt_idcd'			, type: 'string', defaultValue : _global.login_pk				/* 수정ID */
			},{	name: 'updt_urif'			, type: 'string'	/* 수정UI */
			},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명 */
			},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP */
			},{	name: 'crte_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime	/* 생성일시 */
			},{	name: 'crte_idcd'			, type: 'string', defaultValue : _global.login_pk				/* 생성ID */
			},{	name: 'crte_urif'			, type: 'string'	/* 생성UI */
			}
	]
});

