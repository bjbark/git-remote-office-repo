Ext.define('module.mtrl.project.prjtpurcorderlist.model.PrjtPurcOrderList',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'			, type: 'string'	/* invoice번호	*/, defaultValue : 1
		},{	name: 'line_seqn'			, type: 'float'		/* invoice순번	*/
		},{	name: 'bzpl_idcd'			, type: 'string'	/*사업장ID			*/, defaultValue : _global.hqof_idcd
		},{	name: 'invc_date'			, type: 'string'	/* 발주일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'acct_bacd'			, type: 'string'	/* 계정구분코드		*/
		},{	name: 'item_idcd'			, type: 'string'	/* 품목id			*/
		},{	name: 'item_code'			, type: 'string'	/* 품목코드			*/
		},{	name: 'item_name'			, type: 'string'	/* 품목명			*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격			*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명			*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 구매담당ID		*/
		},{	name: 'user_name'			, type: 'string'	/* 담당자명			*/
		},{	name: 'stnd_unit'			, type: 'string'	/* 단위id			*/
		},{	name: 'unit_name'			, type: 'string'	/* 단위명			*/
		},{	name: 'istt_dvcd'			, type: 'string'	/* 입고구분코드		*/
		},{	name: 'istt_pric'			, type: 'float'		/* 입고단가			*/
		},{	name: 'istt_qntt'			, type: 'float'		/* 입고수량			*/
		},{	name: 'istt_amnt'			, type: 'float'		/* 입고금액			*/
		},{	name: 'istt_vatx'			, type: 'float'		/* 입고부가세		*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 합계금액			*/

		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/, defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/, defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/, defaultValue : '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/, defaultValue : 0
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP	*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시	*/, convert	: Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID	*/, defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI	*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP	*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시	*/, convert	: Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/*생성ID		*/, defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI	*/
		}
	]
});
