Ext.define( 'module.custom.kortc.qc.insp.insplist.model.InspListLister', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	 /*  INVOICE번호  */
		},{	name: 'invc_date'			, type: 'string'	 /*  INVOICE일자  */, defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'bzpl_idcd'			, type: 'string'	 /*  사업장ID  */
		},{	name: 'drtr_idcd'			, type: 'string'	 /*  담당자ID  */
		},{	name: 'cstm_idcd'			, type: 'string'	 /*  거래처ID  */
		},{	name: 'clam_dvcd'			, type: 'string'	 /*  클레임구분코드  */
		},{	name: 'item_idcd'			, type: 'string'	/*  품목ID  */
		},{	name: 'make_cmpy'			, type: 'string'	/*  제조사명  */
		},{	name: 'prod_date'			, type: 'string'	 /*  생산일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'prod_qntt'			, type: 'float'		/*  생산수량  */
		},{	name: 'ostt_date'			, type: 'string'	/*  출고일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'ostt_qntt'			, type: 'float'		/*  출고수량  */
		},{	name: 'stok_qntt'			, type: 'float'		/*  재고수량 */
		},{	name: 'unit_idcd'			, type: 'string'	/*  단위ID */
		},{	name: 'clam_qntt'			, type: 'float'		/*  클레임수량 */
		},{	name: 'clam_cont'			, type: 'string'	/*  클레임낸용 */
		},{	name: 'clam_resn'			, type: 'string'	/*  클레임사유 */
		},{	name: 'ttle'				, type: 'string' 	/*  제목 */
		},{	name: 'pcmt'				, type: 'string' 	/*  특이사항 */
		},{	name: 'prod_date'			, type: 'string'	/*  처리일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'proc_drtr_idcd'		, type: 'string' 	/*  처리담당자ID  */
		},{	name: 'clam_proc_dvcd'		, type: 'string' 	/*  클레임처리구분코드  */
		},{	name: 'stok_proc_dvcd'		, type: 'string' 	/*  재고처리구분코드 */
		},{	name: 'caus_memo'			, type: 'string' 	/*  원인메모  */
		},{	name: 'proc_memo'			, type: 'string' 	/*  처리메모  */
		},{	name: 'mesu_memo'			, type: 'string' 	/*  대첵메모  */
		},{	name: 'orig_invc_numb'		, type: 'string' 	/*  원INVOICE번호  */
		},{	name: 'orig_seqn'			, type: 'float' 	/*  원순번  */
		},{	name: 'proc_invc_numb'		, type: 'string' 	/*  처리INVOICE번호  */
		},{	name: 'proc_seqn'			, type: 'float' 	/*  처리순번 */
		},{	name: 'labr_cnfm_date'		, type: 'string' 	/*  연구소확인일자 */
		},{	name: 'labr_drtr_idcd'		, type: 'string' 	/*  연구소담당자ID */
		},{	name: 'labr_memo'			, type: 'string' 	/*  연구소메모  */
		},{	name: 'qult_cnfm_date'		, type: 'string' 	/*  품질확인일자  */
		},{	name: 'qult_drtr_idcd'		, type: 'string' 	/*  품질담당자ID  */
		},{	name: 'qult_memo'			, type: 'string' 	/*  품질메모  */
		},{	name: 'prod_cnfm_date'		, type: 'string' 	/*  생산확인일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'prod_drtr_idcd'		, type: 'string' 	/*  생산담당자ID  */
		},{	name: 'pckg_drtr_idcd'		, type: 'string' 	/*  포장담당자ID  */
		},{	name: 'lott_numb'			, type: 'string' 	/*  Batch No */
		},{	name: 'prod_memo'			, type: 'string'    /*  생산메모  */
		},{	name: 'drtr_name'			, type: 'string'    /*  담당자  */
		},{	name: 'labr_drtr_name'		, type: 'string'    /*  실험담당자  */
		},{	name: 'prod_drtr_name'		, type: 'string'    /*  생산담당자  */
		},{	name: 'pckg_drtr_name'		, type: 'string'    /*  포장담당자  */
		},{	name: 'proc_drtr_name'		, type: 'string'    /*  처리담당자  */
		},{	name: 'make_cmpy_name'		, type: 'string'    /*  제조회사명  */
		},{	name: 'item_code'			, type: 'string'    /*  품목코드 */
		},{	name: 'item_name'			, type: 'string'    /*  품목명  */
		},{	name: 'item_spec'			, type: 'string'    /*  품목규격  */
		},{	name: 'cstm_code'			, type: 'string'    /*  거래처코드  */
		},{	name: 'cstm_name'			, type: 'string'    /*  거래처명  */
		},{	name: 'acct_bacd'			, type: 'string'    /*  계정구분 */
		},{	name: 'mker_lott_numb'		, type: 'string'    /*  제조사 lot번호 */
		},{	name: 'istt_date'			, type: 'string'    /*  입고일자  */, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'istt_qntt'			, type: 'float'     /*  입고수량  */
		},{	name: 'clam_numb'			, type: 'string'    /*  클레임번호  */

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
