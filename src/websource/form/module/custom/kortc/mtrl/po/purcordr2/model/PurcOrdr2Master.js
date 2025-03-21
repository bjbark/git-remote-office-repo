Ext.define('module.custom.kortc.mtrl.po.purcordr2.model.PurcOrdr2Master', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/*invoice번호*/
		},{	name: 'amnd_degr'			, type: 'float'		/* amd차수	*/, defaultValue : 1
		},{	name: 'bzpl_idcd'			, type: 'string'	/*사업장ID	*/
		},{	name: 'invc_date'			, type: 'string'	/*발주일자 	*/, defaultValue : Ext.Date.format(new Date(),'Y-m-d'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'deli_date'			, type: 'string'	/*납기일자 	*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,
		},{	name: 'cstm_idcd'			, type: 'string'	/*거래처ID	*/
		},{	name: 'cstm_code'			, type: 'string'	/*거래처코드	*/
		},{	name: 'cstm_name'			, type: 'string'	/*거래처명	*/
		},{	name: 'drtr_idcd'			, type: 'string'	/*구매담당ID	*/
		},{	name: 'user_name'			, type: 'string'	/*담당자명	*/
		},{	name: 'dept_idcd'			, type: 'string'	/*부서ID		*/
		},{	name: 'coun_iout_dvcd'		, type: 'string'	/*내외자구분코드*/
		},{	name: 'divi_cont'			, type: 'float'		/*분할횟수	*/
		},{	name: 'crny_dvcd'			, type: 'string' 	/*통화구분코드	*/
		},{	name: 'excg_rate'			, type: 'float' 	/*환율		*/
		},{	name: 'supl_dvcd'			, type: 'string', defaultValue : '1000' 	/*조달구분*/
		},{	name: 'stot_dvcd'			, type: 'string'	/*결제구분*/
		},{	name: 'brnd_bacd'			, type: 'string'	/*브랜드분류코드*/
		},{	name: 'brnd_name'			, type: 'string'	/*브랜드명*/
		},{	name: 'apvl_yorn'			, type: 'string'	/*승인여부*/
		},{	name: 'trde_trnt_dvcd'		, type: 'string'	/*운송수단*/

		},{	name: 'offr_qntt'			, type: 'float'		/*발주수량	*/
		},{	name: 'vatx_rate'			, type: 'float'		/*부가세율	*/
		},{	name: 'offr_amnt'			, type: 'float'		/*발주금액	*/
		},{	name: 'offr_vatx'			, type: 'float'		/*발주부가세	*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/*합계금액	*/
		},{	name: 'trst_numb'			, type: 'string'	/*요청번호	*/
		},{	name: 'apvl_yorn'			, type: 'string'	/*상태구분	*/

		},{	name: 'change'				, type: 'string'	/*변경여부	*/
		},{	name: 'remk_text'			, type: 'string'	/*소요근거	*/
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
		},{	name: 'mes_system_type'		, type: 'string',defaultValue:_global.options.mes_system_type	//
		}
	]
});