Ext.define('module.custom.kortc.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'bzpl_idcd'			, type: 'string'	//사업장ID
		},{	name: 'bzpl_name'			, type: 'string'	//사업장명
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//invoice일자
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자ID
		},{	name: 'drtr_name'			, type: 'string'	//담당자명
		},{	name: 'dept_idcd'			, type: 'string'	//부서ID
		},{	name: 'dept_name'			, type: 'string'	//부서명
		},{	name: 'puch_reqt_dvcd'		, type: 'string'	//구래요청구분코드
		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'acpt_numb'			, type: 'string'	//수주번호
		},{	name: 'acpt_amnd_degr'		, type: 'string'		//수주차수
		},{	name: 'change'				, type: 'string'	/* 변경*/

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
	]
});