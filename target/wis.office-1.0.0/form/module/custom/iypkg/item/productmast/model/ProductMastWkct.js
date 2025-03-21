Ext.define( 'module.custom.iypkg.item.productmast.model.ProductMastWkct', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'prod_idcd'			, type: 'string'	/* 제품ID          */
		},{	name: 'line_seqn'			, type: 'float ' 	/* 순번             */
		},{	name: 'wkct_idcd'			, type: 'string'	/* 공정ID          */
		},{	name: 'wkun_dvcd'			, type: 'string'	/* 작업단위구분코드 */
		},{	name: 'qntt_unit_idcd'		, type: 'string'	/* 수량단위ID      */
		},{	name: 'stnd_pric'			, type: 'float ' 	/* 표준단가         */
		},{	name: 'otod_yorn'			, type: 'string'	/* 외주여부         */
		},{	name: 'otod_cstm_idcd'		, type: 'string' 	/* 외주거래처ID    */
		},{	name: 'wkct_name'			, type: 'string' 	/* 공정명           */
		},{	name: 'unit_name'			, type: 'string' 	/* 수량단위명       */
		},{	name: 'cstm_name'			, type: 'string' 	/* 외주거래처명     */
		},{	name: 'rep_chek'			, type: 'boolean'	/* 최종공정여부*    */

		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/ , defaultValue : 0
		},{	name: 'disp_seqn'			, type: 'float'		/* 표시순번		*/ , defaultValue : 0
		},{	name: 'user_memo2'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/
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
		}
	]
});
