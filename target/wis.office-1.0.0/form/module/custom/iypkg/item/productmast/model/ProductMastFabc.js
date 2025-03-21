Ext.define( 'module.custom.iypkg.item.productmast.model.ProductMastFabc', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'prod_idcd'			, type: 'string'	/* 제품ID		*/
		},{	name: 'line_seqn'			, type: 'float' 	/* 순번			*/
		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 지골구분코드	*/
		},{	name: 'item_ttln'			, type: 'float'		/* 품목총장		*/, defaultValue : 0
		},{	name: 'item_ttwd'			, type: 'float'		/* 품목총폭		*/, defaultValue : 0
		},{	name: 'item_leng'			, type: 'float' 	/* 품목길이		*/, defaultValue : 0
		},{	name: 'item_widh'			, type: 'float' 	/* 품목폭		*/, defaultValue : 0
		},{	name: 'item_fxqt'			, type: 'string' 	/* 품목절수		*/, defaultValue : 0
		},{	name: 'mxm2_qntt2'			, type: 'float' 	/* 제곱미터수량	*/, defaultValue : 0
		},{	name: 'mxm2_pric2'			, type: 'float' 	/* 제곱미터단가	*/, defaultValue : 0
		},{	name: 'pqty_pric2'			, type: 'float' 	/* 개당단가		*/, defaultValue : 0
		},{	name: 'fabc_name'			, type: 'string' 	/* 원단명		*/


		},{	name: 'uper_seqn'			, type: 'float' 	/* 상위순번 */
		},{	name: 'disp_seqn'			, type: 'float' 	/* 하위순번 */
		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모 */
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모 */
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID */
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0	/* ROW레벨 */
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0	/* ROW순서 */
		},{	name: 'line_stat'			, type: 'string', defaultValue : '0'/* ROW상태 */
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감 */
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

