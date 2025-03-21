Ext.define('module.prod.order.otodwork.model.OtodWorkDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'orig_invc_numb'		, type: 'string'	/* orgin invoice번호	*/
		},{	name: 'invc_numb'			, type: 'string'		/* orgin INVOICE순번	*/ , defaultValue : 1
		},{	name: 'orig_seqn'			, type: 'int'		/* orgin INVOICE순번	*/ , defaultValue : 1
		},{	name: 'line_seqn'			, type: 'int'		/* INVOICE순번	*/ , defaultValue : 1
		},{	name: 'new_invc_numb'		, type: 'string'	// invoice 번호
		},{	name: 'new_line_seqn'		, type: 'float'		// invoice 순번
//		},{	name: 'lott_numb'			, type: 'string'	// LOT 번호
//		},{	name: 'bzpl_idcd'			, type: 'string'	/*사업장ID	*/, defaultValue : _global.hqof_idcd
		},{	name: 'wkfw_idcd'			, type: 'string'	// 공정흐름ID
		},{	name: 'wkfw_seqn'			, type: 'int'		// 공정흐름순번
		},{	name: 'wkct_idcd'			, type: 'string'	// 공정ID
		},{	name: 'wkct_name'			, type: 'string'	// 공정명
		},{	name: 'cvic_idcd'			, type: 'string'	// 설비ID
		},{	name: 'otod_yorn'			, type: 'string'	// 외주여부
		},{	name: 'otod_cstm_idcd'		, type: 'string'	// 외주거래처ID
		},{	name: 'wkct_item_idcd'		, type: 'string'	// 공정품목ID
		},{	name: 'item_idcd'			, type: 'string'	// 품목ID
		},{	name: 'item_name'			, type: 'string'	// 품명
		},{	name: 'item_spec'			, type: 'string'	// 규격
		},{	name: 'item_code'			, type: 'string'	// 품목코드
//		},{	name: 'mold_idcd'			, type: 'string'	// 금형ID
//		},{	name: 'mtrl_bacd'			, type: 'string'	// 재질분류코드
//		},{	name: 'dayn_dvcd'			, type: 'string'	// 주야구분코드
//		},{	name: 'prod_dept_idcd'		, type: 'string'	// 생산부서ID
		},{	name: 'cstm_idcd'			, type: 'string'	// 거래처ID
//		},{	name: 'item_idcd'			, type: 'string'	// 품목ID
//		},{	name: 'bomt_degr'			, type: 'int'		// BOM차수
//		},{	name: 'unit_idcd'			, type: 'string'	// 단위ID
		},{	name: 'acpt_qntt'			, type: 'float'		// 수주수량
		},{	name: 'stok_used_qntt'		, type: 'float'		// 재고사용수량
		},{	name: 'indn_qntt'			, type: 'float'		// 지시수량
		},{	name: 'need_qntt'			, type: 'float'		// 지시수량
		},{	name: 'dlvy_qntt'			, type: 'float'		// 입고수량
		},{	name: 'plan_strt_dttm'		, type: 'string'	// 계획시작일시
		},{	name: 'plan_endd_dttm'		, type: 'string'	// 계획종료일시
		},{	name: 'work_strt_dttm'		, type: 'string'	// 작업시작일시
		},{	name: 'work_endd_dttm'		, type: 'string'	// 작업종료일시
		},{	name: 'work_dvcd'			, type: 'string'	// 작업구분코드
		},{	name: 'insp_wkct_yorn'		, type: 'string'	// 검사공정여부
		},{	name: 'last_wkct_yorn'		, type: 'string'	// 최종공정여부
		},{	name: 'cofm_yorn'			, type: 'string'	// 확정여부
//		},{	name: 'remk_text'			, type: 'string'	// 비고
		},{	name: 'prog_stat_dvcd'		, type: 'string'	// 진행상태구분코드
		},{	name: 'pckg_cotr_bacd'		, type: 'string'	// 포장용기분류코드
		},{	name: 'uper_seqn'			, type: 'int'		// 상위순번
		},{	name: 'disp_seqn'			, type: 'int'		// 표시순번
		},{	name: 'user_memo'			, type: 'string'	// 사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	// 시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	// 부모ID
		},{	name: 'line_levl'			, type: 'int'		/* ROW레벨	*/, defaultValue : 0
		},{	name: 'line_ordr'			, type: 'int'		/* ROW순서	*/, defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/, defaultValue : 0
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/, defaultValue : 0
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/, convert	: Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/, defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/, convert	: Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/, defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: 'offr_dvcd'			, type: 'string'	//발주구분코드
		},{	name: 'offr_qntt'			, type: 'float'		//발주수량
		},{	name: 'offr_pric'			, type: 'float'		//발주단가
		},{	name: 'offr_amnt'			, type: 'float'		//발주금액
		},{	name: 'offr_vatx'			, type: 'float'		//발주금액부가세
		},{	name: 'vatx_rate'			, type: 'float'		/*발주금액부가세율*/
		},{	name: 'ttsm_amnt'			, type: 'float'		//합계금액
		},{	name: 'deli_date'			, type: 'string'	/*납기일자*/ , serialize: Ext.util.Format.dateToStr
		},{	name: 'offr_baln_qntt'		, type: 'float'		//발주잔량
		},{	name: 'istt_qntt'			, type: 'float'		//입고수량
		},{	name: 'orig_item_name'		, type: 'string'	//모델명
		},{	name: 'dlvy_cstm_name'		, type: 'string'	//수주처
		},{	name: 'mtrl_istt_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	/*자재출고일자*/
		}

	]

});