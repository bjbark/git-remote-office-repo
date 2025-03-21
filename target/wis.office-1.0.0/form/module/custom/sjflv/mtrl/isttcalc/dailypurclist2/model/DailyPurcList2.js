Ext.define( 'module.custom.sjflv.mtrl.isttcalc.dailypurclist2.model.DailyPurcList2', { extend : 'Axt.data.Model',
	fields: [
	 	{	name: 'invc_date'           , type: 'string'	/* 입고일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
	 	},{	name: 'cstm_code'           , type: 'string'	/* 거래처코드	*/
		},{	name: 'cstm_name'           , type: 'string'	/* 거래처명		*/
		},{	name: 'item_code'           , type: 'string'	/* 품목코드		*/
		},{	name: 'item_name'           , type: 'string'	/* 품명		*/
		},{	name: 'item_spec'           , type: 'string'	/* 규격		*/
		},{	name: 'qntt'           		, type: 'float'		/* 수량		*/
		},{	name: 'pric'           		, type: 'float'		/* 단가		*/
		},{	name: 'sply_amnt'           , type: 'float'		/* 공급가액		*/
		},{	name: 'vatx_amnt'           , type: 'float'		/* 부가세		*/
		},{	name: 'ttsm_amnt'           , type: 'float'		/* 합계금액		*/
		},{	name: 'rnum'				, type: 'float'
		},{	name: 'trns_type'			, type: 'string'

		},{	name: 'remk_text'           , type: 'string'	/* 사용자메모	*/
		},{	name: 'user_memo'           , type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'           , type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'           , type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'           , type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string'	/* ROW마감	*/
		},{	name: 'find_name'           , type: 'string'	/* 찾기명		*/
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
		},


		{	name: 'istt_type'		, type: 'string'
		},{	name: '1_month'			, type: 'float'
		},{	name: '2_month'			, type: 'float'
		},{	name: '3_month'			, type: 'float'
		},{	name: '4_month'			, type: 'float'
		},{	name: '5_month'			, type: 'float'
		},{	name: '6_month'			, type: 'float'
		},{	name: '7_month'			, type: 'float'
		},{	name: '8_month'			, type: 'float'
		},{	name: '9_month'			, type: 'float'
		},{	name: '10_month'		, type: 'float'
		},{	name: '11_month'		, type: 'float'
		},{	name: '12_month'		, type: 'float'
		},{	name: 'sum'				, type: 'float'  },
	]
});
