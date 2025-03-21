Ext.define('module.sale.spts.sptsmast.model.SptsMastMaster2', { extend: 'Axt.data.Model',
	fields: [
		{	name : 'invc_numb'			, type : 'string'
		},{	name : 'invc_date'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//invoice일자
		},{	name : 'bzpl_idcd'			, type : 'string'
		},{	name : 'expt_dvcd'			, type : 'string'
		},{	name : 'cstm_idcd'			, type : 'string'
		},{	name : 'cstm_code'			, type : 'string'
		},{	name : 'cstm_name'			, type : 'string'
		},{	name : 'dlvy_cstm_name'		, type : 'string'
		},{	name : 'ostt_dvcd'			, type : 'string'
		},{	name : 'drtr_idcd'			, type : 'string'
		},{	name : 'drtr_name'			, type : 'string'
		},{	name : 'dept_idcd'			, type : 'string'
		},{	name : 'ostt_schd_date'		, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'ostt_yorn'			, type : 'string'
		},{	name : 'ostt_date'			, type : 'string'
		},{	name : 'trut_dvcd'			, type : 'string'
		},{	name : 'dlvy_cond_dvcd'		, type : 'string'
		},{	name : 'deli_date'			, type : 'string'
		},{	name : 'sale_stor_yorn'		, type : 'string'
		},{	name : 'max_deli'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'min_deli'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'remk_text'			, type : 'string'
		},{	name : 'pcod_numb'			, type : 'string'
		},{	name : 'user_memo'			, type : 'string'	//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'	//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'	//부모ID
		},{	name : 'line_levl'			, type : 'float'	, defaultValue : 0		// ROW레벨
		},{	name : 'line_ordr'			, type : 'float'	, defaultValue : 0		// ROW순서
		},{	name : 'line_stat'			, type : 'string'	, defaultValue : '0'		// ROW상태
		},{	name : 'line_clos'			, type : 'string'	, defaultValue : '0'		// ROW마감
		},{	name : 'find_name'			, type : 'string'	//찾기명
		},{	name : 'updt_user_name'		, type : 'string'	//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'	//수정IP
		},{	name : 'updt_dttm'			, type : 'string'	, convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name : 'updt_idcd'			, type : 'string'	, defaultValue : _global.login_pk				// 수정ID
		},{	name : 'updt_urif'			, type : 'string'	//수정UI
		},{	name : 'crte_user_name'		, type : 'string'	//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'	//생성IP
		},{	name : 'crte_dttm'			, type : 'string'	, convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name : 'crte_idcd'			, type : 'string'	, defaultValue : _global.login_pk				// 생성ID
		},{	name : 'crte_urif'			, type : 'string'	//생성UI
		}
	]
});