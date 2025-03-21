Ext.define('module.mtrl.po.purctrstwork.model.PurcTrstWorkInsertPopup', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장ID
		},{	name: 'bzpl_name'			, type: 'string'	//사업장명
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//invoice일자
		},{	name: 'drtr_idcd'			, type: 'string'  , defaultValue : _global.login_id		//당당자ID
		},{	name: 'drtr_name'			, type: 'string'  , defaultValue : _global.login_nm		//담당자명
		},{	name: 'dept_idcd'			, type: 'string'	//부서ID
		},{	name: 'dept_name'			, type: 'string'	//부서명
		},{	name: 'puch_reqt_dvcd'		, type: 'string'	//구래요청구분코드
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'change'				, type: 'string'	//변경
		},{	name: 'offr_proc_dvcd'		, type: 'string'	//구매발주
		},{	name: 'line_clos'			, type: 'string'	//상태

		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		},{	name: 'acct_bacd_name'			, type: 'string'	//8
		},{	name: 'item_code'			, type: 'string'	//
		},{	name: 'item_name'			, type: 'string'	//
		},{	name: 'item_spec'			, type: 'string'	//
		},{	name: 'cont_pric'			, type: 'string'	//
		},{	name: 'mtrl_bacd_name'			, type: 'string'
		},{	name: 'item_spec'			, type: 'string'	//
		},{	name: 'modl_name'			, type: 'string'	//
		},{	name: 'lcls_name'			, type: 'string'	//
		},{	name: 'mcls_name'			, type: 'string'	//
		},{	name: 'scls_name'			, type: 'string'	//



		}
	]
});