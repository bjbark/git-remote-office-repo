Ext.define('module.prod.project.prjtotodwork.model.PrjtOtodWorkMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'new_invc_numb'		, type: 'string'	/*newinvoice번호*/
		},{	name: 'invc_numb'			, type: 'string'	/* invoice번호	*/, defaultValue : 1
		},{	name: 'amnd_degr'			, type: 'float'		/* amd차수	*/, defaultValue : 1
		},{	name: 'bzpl_idcd'			, type: 'string'	/*사업장ID	*/, defaultValue : _global.hqof_idcd
		},{	name: 'invc_date'			, type: 'string'	/*발주일자 	*/, defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'cstm_idcd'			, type: 'string'	/*거래처ID	*/
		},{	name: 'cstm_code'			, type: 'string'	/*거래처코드	*/
		},{	name: 'cstm_name'			, type: 'string'	/*거래처명	*/
		},{	name: 'drtr_idcd'			, type: 'string'	/*구매담당ID	*/
		},{	name: 'user_name'			, type: 'string'	/*담당자명	*/
		},{	name: 'dept_idcd'			, type: 'string'	/*부서ID		*/
		},{	name: 'coun_iout_dvcd'		, type: 'string'	/*내외자구분코드*/
		},{	name: 'divi_cont'			, type: 'float'		/*분할횟수	*/
		},{	name: 'crny_dvcd'			, type: 'string'	/*통화구분코드	*/
		},{	name: 'excg_rate'			, type: 'float'		/*환율		*/
		},{	name: 'supl_dvcd'			, type: 'string', defaultValue : '1000' 	/*조달구분*/
		},{	name: 'pjod_idcd'			, type: 'string'	/*조달구분*/
		},{	name: 'max_deli'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	/*납기일자*/
		},{	name: 'mtrl_ostt_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	/*자재출고일자*/

		},{	name: 'offr_qntt'			, type: 'float'		/*발주수량	*/
		},{	name: 'vatx_rate'			, type: 'float'		/*부가세율	*/
		},{	name: 'offr_amnt'			, type: 'float'		/*발주금액	*/
		},{	name: 'offr_vatx'			, type: 'float'		/*발주부가세	*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/*합계금액	*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자	*/ , serialize: Ext.util.Format.dateToStr

		},{	name: 'pjod_idcd'			, type: 'string'	/* 프로젝트수주id*/
		},{	name: 'line_seqn'			, type: 'float'		/* 순번 		*/
		},{	name: 'item_idcd'			, type: 'string'	/* 품목id		*/
		},{	name: 'item_name'			, type: 'string'	/* 품명		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'item_mtrl'			, type: 'string'	/* 품목재질		*/
		},{	name: 'ivst_wkct_idcd'		, type: 'string'	/* 투입공정id	*/
		},{	name: 'unit_idcd'			, type: 'string'	/* 단위id		*/
		},{	name: 'supl_dvcd'			, type: 'string'	/* 조달구분코드	*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처id	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'ndqt_nmrt'			, type: 'string'	/* 소요량분자	*/
		},{	name: 'ndqt_dnmn'			, type: 'string'	/* 소요량분모	*/
		},{	name: 'need_qntt'			, type: 'float'		/* 소요수량		*/
		},{	name: 'used_schd_date'		, type: 'string'	/* 사용예정일자	*/
		},{	name: 'lwcs_yorn'			, type: 'string'	/* 하위유무		*/
		},{	name: 'incm_loss_rate'		, type: 'float'		/* 사내LOSS율	*/
		},{	name: 'otcm_loss_rate'		, type: 'float'		/* 사외LOSS율	*/
		},{	name: 'stok_plac'			, type: 'string'	/* 재고위치		*/
		},{	name: 'stok_unit_idcd'		, type: 'string'	/* 재고단위 ID	*/
		},{	name: 'remk_text'			, type: 'string'	/* 비고		*/
		},{	name: 'last_yorn'			, type: 'string'	/* 최종여부		*/
		},{	name: 'imge_1fst'			, type: 'string'	/* 이미지1		*/
		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/
		},{	name: 'disp_seqn'			, type: 'float'		/* 표시순번		*/

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
		}
	]
});