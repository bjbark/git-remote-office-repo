Ext.define( 'module.custom.kortc.qc.chge.chgemast.model.ChgeMastLister', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/*  INVOICE번호  	*/
		},{	name: 'rcpt_date'			, type: 'string'	/*  접수일자  		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'	/*  거래처ID  		*/
		},{	name: 'cstm_name'			, type: 'string'	/*  거래처명  		*/
		},{	name: 'item_idcd'			, type: 'string'	/*  품목ID  		*/
		},{	name: 'item_code'			, type: 'string'	/*  품목코드  		*/
		},{	name: 'item_name'			, type: 'string'	/*  품목명  		*/
		},{	name: 'crty_bacd'			, type: 'string' 	/*  차종  			*/
		},{	name: 'isir_sbmt_date'		, type: 'string' 	/*  ISIR제출일자 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'isir_apvl_date'		, type: 'string' 	/*  ISIR승인일자 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'fart_adpt_date'		, type: 'string' 	/*  초도품적용일자 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'fart_dlvy_date'		, type: 'string' 	/*  초도품납품일자 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'fart_prod_lott'		, type: 'string' 	/*  초도품생산LOT 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'mvfr_lott_1fst'		, type: 'string' 	/*  유동LOT1 		*/
		},{	name: 'mvfr_lott_2snd'		, type: 'string' 	/*  유동LOT2 		*/
		},{	name: 'mvfr_lott_3trd'		, type: 'string' 	/*  유동LOT3	 	*/
		},{	name: 'chek_yorn_1fst'		, type: 'string' 	/*  유효성여부1	 	*/
		},{	name: 'chek_yorn_2snd'		, type: 'string' 	/*  유효성여부2	 	*/
		},{	name: 'chek_yorn_3trd'		, type: 'string' 	/*  유효성여부3	 	*/
		},{	name: 'remk_text'			, type: 'string'	/*  비고		 	*/
		},{	name: 'chge_resn'			, type: 'string'	/*  변경사유	 	*/
		},{	name: 'upld_dttm'			, type: 'string'	/*  제출/승인	 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'file_name'			, type: 'string'	/*  파일명		 	*/
		},{	name: 'assi_seqn'			, type: 'float'		/*  보조순번	 	*/
		},{	name: '4mdv_1fst'			, type: 'string' 	/*  4M구분1	 	*/
		},{	name: '4mdv_2snd'			, type: 'string' 	/*  4M구분2	 	*/
		},{	name: '4mdv_3trd'			, type: 'string' 	/*  4M구분3	 	*/
		},{	name: '4mdv_4frt'			, type: 'string' 	/*  4M구분4	 	*/
		},{	name: 'chck_yorn'			, type: 'string' 	/*  체크박스 변경여부 	*/
		},{	name: 'invc_date'			, type: 'string'	/*  INVOICE일자  	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'drtr_idcd'			, type: 'string'	/*  담당자ID  		*/
		},{	name: 'cstm_code'			, type: 'string'	/*  거래처코드  		*/
		},{	name: 'lott_numb'			, type: 'string'	/*  lot번호  		*/
		},{	name: 'insp_date'			, type: 'string'	/*  검사일자  		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'istt_qntt'			, type: 'float'		/*  입고수량  		*/
		},{	name: 'poor_qntt'			, type: 'float'		/*  불량수량 		*/
		},{	name: 'poor_rate'			, type: 'float'		/*  불량율 		*/
		},{	name: 'pass_yorn'			, type: 'string'	/*  공정id 		*/
		},{	name: 'wkct_idcd'			, type: 'string'	/*  공정id 		*/
		},{	name: 'poor_cont'			, type: 'string' 	/*  불량내용 		*/
		},{	name: 'incn_caus'			, type: 'string' 	/*  부적합원인 		*/
		},{	name: 'proc_schm'			, type: 'string' 	/*  처리방안 		*/
		},{	name: 'proc_rslt'			, type: 'string' 	/*  처리결과  		*/
		},{	name: 'proc_date'			, type: 'string'	/*  처리일자  		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'proc_cnfm_date'		, type: 'string'	/*  처리확인일자  	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'fitg_yorn'			, type: 'string' 	/*  적합여부  		*/
		},{	name: 'user_idcd'			, type: 'string' 	/*  사용자ID 		*/
		},{	name: 'modify'				, type: 'string' 	/*  차종  			*/
		},{	name: 'dept_name'			, type: 'string' 	/*  부서명 		*/
		},{	name: 'user_name'			, type: 'string' 	/*  사용자명		*/
		},{	name: 'line_seqn'			, type: 'float'		/*  순번  			*/

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
