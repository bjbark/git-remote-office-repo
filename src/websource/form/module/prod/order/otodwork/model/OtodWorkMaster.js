Ext.define('module.prod.order.otodwork.model.OtodWorkMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/*invoice 번호*/
		},{	name: 'new_invc_numb'		, type: 'string'	// invoice 번호
		},{	name: 'new_line_seqn'		, type: 'float'		// invoice 순번
		},{	name: 'wkod_dvcd'			, type: 'string'	// 작업지시구분코드
		},{	name: 'lott_numb'			, type: 'string'	// LOT 번호
		},{	name: 'bzpl_idcd'			, type: 'string'	/*사업장ID	*/, defaultValue : _global.hqof_idcd
		},{	name: 'pdod_date'			, type: 'string'	// 생산지시일자
		},{	name: 'acpt_numb'			, type: 'string'	// 수주번호
		},{	name: 'acpt_amnd_degr'		, type: 'int'		/* 수주AMD차수	*/ ,defaultValue : 1
		},{	name: 'acpt_seqn'			, type: 'int'		// 수주순번
		},{	name: 'cstm_idcd'			, type: 'string'	// 거래처ID
		},{	name: 'pdsd_numb'			, type: 'string'	// 생산계획번호
		},{	name: 'pdsd_date'			, type: 'string'	// 생산계획일자
		},{	name: 'max_deli'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	/*납기일자*/

		},{	name: 'wkfw_idcd'			, type: 'string'	// 공정흐름
		},{	name: 'bomt_degr'			, type: 'int'		// BOM차수
		},{	name: 'unit_idcd'			, type: 'string'	// 단위ID
		},{	name: 'strt_dttm'			, type: 'string'	// 시작일시
		},{	name: 'endd_dttm'			, type: 'string'	// 종료일시
		},{	name: 'indn_qntt'			, type: 'float'		// 지시수량
		},{	name: 'work_date'			, type: 'string'	// 작업일자
		},{	name: 'stnd_unit'			, type: 'string'
		},{	name: 'stnd_unit_qntt'		, type: 'float'		// 기준단위수량
		},{	name: 'prod_bzpl_idcd'		, type: 'string'	// 생상사업장ID
		},{	name: 'prog_stat_dvcd'		, type: 'string'	// 진행구분코드
		},{	name: 'remk_text'			, type: 'string'	// 비고
		},{	name: 'last_insp_yorn'		, type: 'string'	// 최종검사여부
		},{	name: 'last_insp_date'		, type: 'string'	// 최종검사일자
		},{	name: 'user_memo'			, type: 'string'	// 사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	// 시스템메모
		},{	name: 'pckg_cotr_bacd'		, type: 'string'	// 포장용기분류코드
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
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드	*/
		},{	name: 'offr_date'			, type: 'string'	/* 발주일자		*/
		},{	name: 'user_name'			, type: 'string'	/* 담당자명		*/
		},{	name: 'invc_date'			, type: 'string'	/*발주일자 		*/, defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'drtr_idcd'			, type: 'string'	/*구매담당ID	*/, defaultValue: _global.login_pk
		},{	name: 'offr_qntt'			, type: 'float'		, defaultValue : 0//발주수량
		},{	name: 'offr_pric'			, type: 'float'		, defaultValue : 0//발주단가
		},{	name: 'offr_amnt'			, type: 'float'		, defaultValue : 0//발주금액
		},{	name: 'offr_vatx'			, type: 'float'		, defaultValue : 0//발주금액부가세
		},{	name: 'ttsm_amnt'			, type: 'float'		, defaultValue : 0//합계금액
		},{	name: 'offr_baln_qntt'		, type: 'float'		//발주잔량
		},{	name: 'mtrl_ostt_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	/*자재출고일자*/
		}

//
//		},{	name: 'amnd_degr'			, type: 'float'		/* amd차수	*/, defaultValue : 1
//		},{	name: 'dept_idcd'			, type: 'string'	/*부서ID		*/
//		},{	name: 'coun_iout_dvcd'		, type: 'string'	/*내외자구분코드*/
//		},{	name: 'divi_cont'			, type: 'float'		/*분할횟수	*/
//		},{	name: 'crny_dvcd'			, type: 'string'	/*통화구분코드	*/
//		},{	name: 'excg_rate'			, type: 'float'		/*환율		*/
//		},{	name: 'supl_dvcd'			, type: 'string', defaultValue : '1000' 	/*조달구분*/
//		},{	name: 'pjod_idcd'			, type: 'string'	/*조달구분*/
//		},{	name: 'max_deli'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	/*납기일자*/
//		},{	name: 'offr_qntt'			, type: 'float'		/*발주수량	*/
//		},{	name: 'vatx_rate'			, type: 'float'		/*부가세율	*/
//		},{	name: 'offr_amnt'			, type: 'float'		/*발주금액	*/
//		},{	name: 'offr_vatx'			, type: 'float'		/*발주부가세	*/
//		},{	name: 'ttsm_amnt'			, type: 'float'		/*합계금액	*/
//		},{	name: 'deli_date'			, type: 'string'	/* 납기일자	*/ , serialize: Ext.util.Format.dateToStr
//		},{	name: 'pjod_idcd'			, type: 'string'	/* 프로젝트수주id*/
//		},{	name: 'line_seqn'			, type: 'float'		/* 순번 		*/
//		},{	name: 'item_name'			, type: 'string'	/* 품명		*/
//		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
//		},{	name: 'item_mtrl'			, type: 'string'	/* 품목재질		*/
//		},{	name: 'ivst_wkct_idcd'		, type: 'string'	/* 투입공정id	*/
//		},{	name: 'supl_dvcd'			, type: 'string'	/* 조달구분코드	*/
//		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처id	*/
//		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
//		},{	name: 'ndqt_nmrt'			, type: 'string'	/* 소요량분자	*/
//		},{	name: 'ndqt_dnmn'			, type: 'string'	/* 소요량분모	*/
//		},{	name: 'need_qntt'			, type: 'float'		/* 소요수량		*/
//		},{	name: 'used_schd_date'		, type: 'string'	/* 사용예정일자	*/
//		},{	name: 'lwcs_yorn'			, type: 'string'	/* 하위유무		*/
//		},{	name: 'incm_loss_rate'		, type: 'float'		/* 사내LOSS율	*/
//		},{	name: 'otcm_loss_rate'		, type: 'float'		/* 사외LOSS율	*/
//		},{	name: 'stok_plac'			, type: 'string'	/* 재고위치		*/
//		},{	name: 'stok_unit_idcd'		, type: 'string'	/* 재고단위 ID	*/
//		},{	name: 'last_yorn'			, type: 'string'	/* 최종여부		*/
//		},{	name: 'imge_1fst'			, type: 'string'	/* 이미지1		*/
//		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/
//		},{	name: 'disp_seqn'			, type: 'float'		/* 표시순번		*/
//		},{	name: 'user_memo'			, type: 'string'	/*사용자메모	*/
//		},{	name: 'sysm_memo'			, type: 'string'	/*시스템메모	*/
//		},{	name: 'prnt_idcd'			, type: 'string'	/*부모ID		*/
//		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/, defaultValue : 0
//		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/, defaultValue : 0
//		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/, defaultValue : '0'
//		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/, defaultValue : 0
//		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
//		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명*/
//		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP	*/
//		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시	*/, convert	: Ext.util.Format.strToDateTime
//		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID	*/, defaultValue: _global.login_pk
//		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI	*/
//		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명*/
//		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP	*/
//		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시	*/, convert	: Ext.util.Format.strToDateTime
//		},{	name: 'crte_idcd'			, type: 'string'	/*생성ID		*/, defaultValue: _global.login_pk
//		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI	*/
//		}
	]
});