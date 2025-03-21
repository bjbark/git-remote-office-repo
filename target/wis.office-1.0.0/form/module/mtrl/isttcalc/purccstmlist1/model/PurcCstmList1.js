Ext.define( 'module.mtrl.isttcalc.purccstmlist1.model.PurcCstmList1', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_date'           , type: 'string'	/* 입고일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_name'           , type: 'string'	/* 거래명		*/
		},{	name: 'item_name'           , type: 'string'	/* 품명		*/
		},{	name: 'item_spec'           , type: 'string'	/* 규격		*/
		},{	name: 'qntt'           		, type: 'float'		/* 수량		*/
		},{	name: 'pric'           		, type: 'float'		/* 단가		*/
		},{	name: 'sply_amnt'           , type: 'float'		/* 공급가액		*/
		},{	name: 'vatx_amnt'           , type: 'float'		/* 부가세액		*/
		},{	name: 'ttsm_amnt'           , type: 'float'		/* 합계금액		*/
		},{	name: 'iomy_amnt'           , type: 'float'		/* 지급금액		*/
		},{	name: 'npay_amnt'           , type: 'float'		/* 미지급액		*/

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
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		}
	]
});
