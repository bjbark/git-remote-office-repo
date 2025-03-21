Ext.define( 'module.custom.kortc.qc.insp.inspentry.model.InspEntryLister', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	 /*  INVOICE번호  */
		},{	name: 'invc_numb2'			, type: 'string'	 /*  INVOICE일자  */
		},{	name: 'line_seqn'			, type: 'float'		 /*  순번  */
		},{	name: 'invc_date'			, type: 'string'	 /*  INVOICE일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'drtr_idcd'			, type: 'string'	 /*  담당자ID  */
		},{	name: 'cstm_idcd'			, type: 'string'	 /*  거래처ID  */
		},{	name: 'cstm_code'			, type: 'string'	 /*  거래처코드  */
		},{	name: 'cstm_name'			, type: 'string'	 /*  거래처명  */
		},{	name: 'item_idcd'			, type: 'string'	/*  품목ID  */
		},{	name: 'item_code'			, type: 'string'	/*  품목코드  */
		},{	name: 'item_name'			, type: 'string'	/*  품목명  */
		},{	name: 'lott_numb'			, type: 'string'	/*  lot번호  */
		},{	name: 'insp_date'			, type: 'string'	/*  검사일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'istt_qntt'			, type: 'float'		/*  입고수량  */
		},{	name: 'poor_qntt'			, type: 'float'		/*  불량수량 */
		},{	name: 'poor_rate'			, type: 'float'		/*  불량율 */
		},{	name: 'pass_yorn'			, type: 'string'	/*  공정id */
		},{	name: 'wkct_idcd'			, type: 'string'	/*  공정id */
		},{	name: 'remk_text'			, type: 'string'	/*  비고 */
		},{	name: 'poor_cont'			, type: 'string' 	/*  불량내용 */
		},{	name: 'incn_caus'			, type: 'string' 	/*  부적합원인 */
		},{	name: 'proc_schm'			, type: 'string' 	/*  처리방안 */
		},{	name: 'proc_rslt'			, type: 'string' 	/*  처리결과  */
		},{	name: 'proc_date'			, type: 'string'	/*  처리일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'proc_cnfm_date'		, type: 'string'	/*  처리확인일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'fitg_yorn'			, type: 'string' 	/*  적합여부  */
		},{	name: 'crty_bacd_name'		, type: 'string' 	/*  차종  */
		},{	name: 'user_idcd'			, type: 'string' 	/*  차종  */
		},{	name: 'modify'				, type: 'string' 	/*  차종  */
		},{	name: 'dept_name'			, type: 'string' 	/*  차종  */
		},{	name: 'user_name'			, type: 'string' 	/*  차종  */
		},{	name: 'optn_1'				, type: 'string' 	/*    */
		},{	name: 'optn_2'				, type: 'string' 	/*    */
		},{	name: 'optn_3'				, type: 'string' 	/*    */
		},{	name: 'optn_4'				, type: 'string' 	/*    */
		},{	name: 'optn_5'				, type: 'string' 	/*    */
		},{	name: 'optn_6'				, type: 'string' 	/*    */
		},{	name: 'optn_7'				, type: 'string' 	/*    */
		},{	name: 'use_yorn'			, type: 'string' 	/*    */
		},{	name: 'nuse_yorn'			, type: 'string' 	/*    */


		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
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
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	]
});
