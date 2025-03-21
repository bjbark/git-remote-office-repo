Ext.define('module.qc.insp.inspentry6.model.InspEntry6Master', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* INVOICE번호	*/
		},{	name: 'line_seqn'			, type: 'float'		/* 순번	*/
		},{	name: 'invc_date'			, type: 'string' 	/* invoice일자	*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'insp_dvcd'			, type: 'string' 	/* 검사구분코드	*/
		},{	name: 'cstm_idcd'			, type: 'string' 	/* 거래처ID*/
		},{	name: 'cstm_name'			, type: 'string' 	/* 거래처명*/
		},{	name: 'dlvy_idcd'			, type: 'string' 	/* 납품ID*/
		},{	name: 'dlvy_seqn'			, type: 'string' 	/* 납품순번*/
		},{	name: 'cnfm_dept_idcd'		, type: 'string' 	/* 확인부서ID	*/
		},{	name: 'cnfm_drtr_idcd'		, type: 'string' 	/* 확인담당자ID	*/
		},{	name: 'item_idcd'			, type: 'string' 	/* 품목ID*/
		},{	name: 'dlvy_qntt'			, type: 'string' 	/* 납품수량	*/
		},{	name: 'dlvy_wrhs_idcd'		, type: 'string' 	/* 납품창고ID	*/
		},{	name: 'dlvy_wrhs_name'		, type: 'string' 	/* 납품창고ID	*/
		},{	name: 'lott_numb'			, type: 'string' 	/* LOT번호	*/
		},{	name: 'insp_drtr_idcd'		, type: 'string' 	/* 검사담당자ID*/
		},{	name: 'insp_mthd_dvcd'		, type: 'string' 	/* 검사방법구분코드*/
		},{	name: 'msmt_valu'			, type: 'float' 	/* 측정값*/
		},{	name: 'insp_qntt'			, type: 'float' 	/* 검사수량     */
		},{	name: 'poor_qntt'			, type: 'float' 	/* 불량수량*/
		},{	name: 'pass_yorn'			, type: 'float' 	/* 합격여부*/
		},{	name: 'pass_qntt'			, type: 'string' 	/* 합격수량*/
		},{	name: 'poor_type_bacd'		, type: 'string' 	/* 불량유형분류코드*/
		},{	name: 'poor_caus_bacd'		, type: 'string' 	/* 불량원인분류코드*/
		},{	name: 'judt_dvcd'			, type: 'string' 	/* 판정구분코드*/
		},{	name: 'trtm_drtr_idcd'		, type: 'string' 	/* 조치담당자ID*/, defaultValue: _global.login_pk
		},{	name: 'rett_qntt'			, type: 'string' 	/* 반품수량*/
		},{	name: 'dsse_qntt'			, type: 'float' 	/* 폐기수량*/
		},{	name: 'updt_qntt'			, type: 'float' 	/* 수정수량*/
		},{	name: 'rewk_indn_numb'		, type: 'string' 	/* 재작업지시번호*/
		},{	name: 'rewk_qntt'			, type: 'float' 	/* 재작업수량*/
		},{	name: 'scex_qntt'			, type: 'string' 	/* 특채수량*/
		},{	name: 'istt_yorn'			, type: 'string' 	/* 입고여부*/
		},{	name: 'orig_invc_numb'		, type: 'string' 	/* 원INVOICE번호*/
		},{	name: 'orig_amnd_degr'		, type: 'string' 	/* 원AMD차수*/
		},{	name: 'orig_seqn'			, type: 'string' 	/* 원순번*/
		},{	name: 'insp_drtr_name'		, type: 'string' 	/* 검사담당자		*/
		},{	name: 'trtm_drtr_name'		, type: 'string' 	/* 조치담당자		*/
		},{	name: 'item_code'			, type: 'string' 	/* 품목코드		*/
		},{	name: 'item_name'			, type: 'string' 	/* 품목이름		*/
		},{	name: 'item_spec'			, type: 'string' 	/* 품목규격		*/
		},{	name: 'trtm_date'			, type: 'string' 	/* 조치일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue : '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/ , defaultValue : '0'
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: '_flag'				, type: 'string'
		},{	name: 'hqof_idcd'			, type: 'string', defaultValue : _global.hq_id
		},{	name: 'amnd_degr'			, type: 'string'
		},{	name: 'pref_rank'			, type: 'string'
		},{	name: 'plan_sttm'			, type: 'string'
		},{	name: 'plan_edtm'			, type: 'string'
		},{	name: 'acpt_qntt'			, type: 'string'
		},{	name: 'wkfw_idcd'			, type: 'string'
		},
	]
});