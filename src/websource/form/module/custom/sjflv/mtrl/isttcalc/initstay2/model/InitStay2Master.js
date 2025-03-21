Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay2.model.InitStay2Master', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'line_seqn'			, type: 'string'  	//invoice항번
		},{	name: 'row_type'			, type: 'string'	//원Invoice번호
		},{	name: 'expt_dvcd'			, type: 'string'	//수출구분코드
		},{	name: 'pcod_numb'			, type: 'string'	//pono
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'trns_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'item_code'			, type: 'string'	//거래처ID
		},{	name: 'item_name'			, type: 'string'	//거래처ID
		},{	name: 'item_spec'			, type: 'string'	//
		},{	name: 'cstm_idcd'			, type: 'string'	//
		},{	name: 'cstm_code'			, type: 'string'	//
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'mdtn_prsn'			, type: 'string'	//중개인
		},{	name: 'cont_date'			, type: 'string'	//계약일자
		},{	name: 'drtr_idcd'			, type: 'string', defaultValue: _global.login_id		//담당자ID
		},{	name: 'cstm_drtr_name'		, type: 'string'	//담당자명
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'dept_idcd'			, type: 'string'	//부서ID
		},{	name: 'dept_name'			, type: 'string'	//부서명
		},{	name: 'lott_numb'			, type: 'string'	//통화구분코드
		},{	name: 'acpt_dvcd'			, type: 'string'	//수주구분
		},{	name: 'prod_trst_dvcd'		, type: 'string'	//생산구분
		},{	name: 'purc_invc_numb'		, type: 'string'	//생산구분
		},{	name: 'purc_invc_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//생산구분
		},{	name: 'istt_qntt'			, type: 'float' 	//환율
		},{	name: 'istt_pric'			, type: 'float' 	//환율
		},{	name: 'istt_amnt'			, type: 'float' 	//환율
		},{	name: 'istt_vatx'			, type: 'float'		//환율
		},{	name: 'ttsm_amnt'			, type: 'float' 	//환율
		},{	name: 'acpt_numb'			, type: 'string'	//수주번호
		},{	name: 'acpt_seqn'			, type: 'string'	//수주항번

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
		}
	]
});