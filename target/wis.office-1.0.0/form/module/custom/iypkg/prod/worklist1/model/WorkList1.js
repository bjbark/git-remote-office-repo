Ext.define( 'module.custom.iypkg.prod.worklist1.model.WorkList1', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_date'           , type: 'string'	/* 생산일자		*/, defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr//계획일자
		},{	name: 'cstm_name'           , type: 'string'	/* 거래처명		*/
		},{	name: 'acpt_date'           , type: 'string'	/* 수주일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'prod_name'           , type: 'string'	/* 품명		*/
		},{	name: 'prod_spec'           , type: 'string'	/* 규격		*/
		},{	name: 'acpt_qntt'           , type: 'float'		/* 수주수량		*/
		},{	name: 'plan_qntt'           , type: 'float'		/* 계획수량		*/
		},{	name: 'mxm2_pric'           , type: 'string'	/* 단가		*/
		},{	name: 'loss_qntt'           , type: 'float'		/* loss량	*/
		},{	name: 'amnt'                , type: 'float'		/* 금액		*/
		},{	name: 'rnum'				, type: 'string'	/* 		*/

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
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		},{	name: 'mngt_bzpl_idcd'      , type: 'string'	/* mngt_bzpl_idcd*/
		},{	name: 'mngt_bzpl_name'      , type: 'string'	/* mngt_bzpl_idcd*/
		},{	name: 'cstm_dvcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'lcls_idcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'mcls_idcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'scls_idcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'clss_desc'			, type: 'string'	//분류정보
		},{	name: 'lcls_name'			, type: 'string'	//대분류id
		},{	name: 'mcls_name'			, type: 'string'	//중분류id
		},{	name: 'wkct_name'			, type: 'string'	//공정명
		},{	name: 'wkct_stnm'			, type: 'string'	//보조공정명
		},{	name: 'scls_name'			, type: 'string'	//소분류id
		},{	name: 'file_name'			, type: 'string'	//사업자등록증 이름
		}
	]
});
