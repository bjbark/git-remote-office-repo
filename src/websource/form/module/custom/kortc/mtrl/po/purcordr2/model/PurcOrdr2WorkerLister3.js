Ext.define('module.custom.kortc.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister3', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'new_invc_numb'		, type: 'string'	/*invoice번호*/
		},{	name: 'invc_numb'			, type: 'string'	/*invoice번호*/
		},{	name: 'new_line_seqn'		, type: 'int' , defaultValue : 1			//순번
		},{	name: 'line_seqn'			, type: 'int' , defaultValue : 1			//순번
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_code'			, type: 'string'		//품목코드
		},{	name: 'item_name'			, type: 'string'		//품명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'unit_idcd'			, type: 'string'		//단위ID
		},{	name: 'unit_name'			, type: 'string'		//단위명
		},{	name: 'offr_dvcd'			, type: 'string'		//
		},{	name: 'reqt_qntt'			, type: 'float'			//계약단가
		},{	name: 'offr_qntt'			, type: 'float'			//수량
		},{	name: 'offr_pric'			, type: 'float'			//단가
		},{	name: 'offr_amnt'			, type: 'float'			//발주금액
		},{	name: 'offr_vatx'			, type: 'float'			//부가세
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'offr_amnt'			, type: 'float'			//금액
		},{	name: 'wrhs_name'			, type: 'string'		//창고명
		},{	name: 'drtr_idcd'			, type: 'string'		//담당자ID
		},{	name: 'cstm_idcd'			, type: 'string'		//거래처ID
		},{	name: 'cstm_code'			, type: 'string'		//거래처코드
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'uper_seqn'			, type: 'float'			//상위순번
		},{	name: 'disp_seqn'			, type: 'float'			//표시순번
		},{	name: 'invc_date'			, type: 'string'		/* 발주일자		*/ , serialize: Ext.util.Format.dateToStr,
		},{	name: 'deli_date'			, type: 'string'		/* 납기일자		*/ , serialize: Ext.util.Format.dateToStr,
		},{	name: 'usge_dvcd'			, type: 'string'		//용도
		},{	name: 'supl_dvcd'			, type: 'string'		//조달구분
		},{	name: 'crny_dvcd'			, type: 'string'		//통화구분
		},{	name: 'trde_trnt_dvcd'		, type: 'string'		//운송수단
		},{	name: 'apvl_yorn'			, type: 'string'		//승인여부

		},{	name: 'user_memo'			, type: 'string'	/*사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/*시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/*부모ID		*/
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
		},{	name: 'modi_yorn'			, type: 'string', defaultValue : 'n'		//수정 변수
		}
	],
	recalculation: function(inv) {
		var row = this
			resId =  _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase(),
			baseamt = row.get('offr_qntt') * row.get('offr_pric'),
			search = Ext.ComponentQuery.query('module-purcordr-worker-search2')[0]
		;

		row.set('offr_amnt'	, Math.floor((row.get('offr_qntt') * row.get('offr_pric')) / 10) * 10);
		row.set('offr_vatx'	, Math.trunc(row.get('offr_amnt')/Number(_global.tax_rt)));

		row.set('ttsm_amnt'	, row.get('offr_amnt') + row.get('offr_vatx'));
	}
});