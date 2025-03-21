Ext.define('module.sale.spts.sptsmast.model.SptsMastDetail2', { extend: 'Axt.data.Model',
	fields: [
		{	name : 'invc_numb'			, type : 'string'
		},{	name : 'line_seqn'			, type : 'int'		, defaultValue : 1
		},{	name : 'acpt_numb'			, type : 'string'
		},{	name : 'acpt_date'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'acpt_seqn'			, type : 'int'		, defaultValue : 0
		},{	name : 'item_idcd'			, type : 'string'
		},{	name : 'item_code'			, type : 'string'
		},{	name : 'item_name'			, type : 'string'
		},{	name : 'item_spec'			, type : 'string'
		},{	name : 'sale_unit'			, type : 'string'
		},{	name : 'norm_sale_pric'		, type : 'float'	, defaultValue : 0
		},{	name : 'sale_stnd_pric'		, type : 'float'	, defaultValue : 0
		},{	name : 'sale_pric'			, type : 'float'	, defaultValue : 0
		},{	name : 'trst_qntt'			, type : 'float'	, defaultValue : 0
		},{	name : 'vatx_incl_yorn'		, type : 'string'
		},{	name : 'vatx_rate'			, type : 'float'	, defaultValue : 0
		},{	name : 'sale_amnt'			, type : 'float'	, defaultValue : 0
		},{	name : 'vatx_amnt'			, type : 'float'	, defaultValue : 0
		},{	name : 'ttsm_amnt'			, type : 'float'	, defaultValue : 0
		},{	name : 'deli_date'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'stnd_unit'			, type : 'string'
		},{	name : 'stnd_unit_qntt'		, type : 'float'
		},{	name : 'wrhs_idcd'			, type : 'string'
		},{	name : 'dlvy_cstm_idcd'		, type : 'string'
		},{	name : 'dsct_yorn'			, type : 'string'
		},{	name : 'ostt_dvcd'			, type : 'string'
		},{	name : 'insp_dvcd'			, type : 'string'
		},{	name : 'insp_date'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'pcod_numb'			, type : 'string'
		},{	name : 'ostt_yorn'			, type : 'string'
		},{	name : 'ostt_date'			, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'ostt_qntt'			, type : 'float'	, defaultValue : 0
		},{	name : 'uper_seqn'			, type : 'int'		, defaultValue : 0
		},{	name : 'disp_seqn'			, type : 'int'		, defaultValue : 0
		},{	name : 'user_memo'			, type: 'string'	//사용자메모
		},{	name : 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name : 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name : 'line_levl'			, type: 'float'		, defaultValue : 0		// ROW레벨
		},{	name : 'line_ordr'			, type: 'float'		, defaultValue : 0		// ROW순서
		},{	name : 'line_stat'			, type: 'string'	, defaultValue: '0'		// ROW상태
		},{	name : 'line_clos'			, type: 'string'	, defaultValue: '0'		// ROW마감
		},{	name : 'find_name'			, type: 'string'	//찾기명
		},{	name : 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name : 'updt_ipad'			, type: 'string'	//수정IP
		},{	name : 'updt_dttm'			, type: 'string'	, convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name : 'updt_idcd'			, type: 'string'	, defaultValue : _global.login_pk				// 수정ID
		},{	name : 'updt_urif'			, type: 'string'	//수정UI
		},{	name : 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name : 'crte_ipad'			, type: 'string'	//생성IP
		},{	name : 'crte_dttm'			, type: 'string'	, convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name : 'crte_idcd'			, type: 'string'	, defaultValue : _global.login_pk				// 생성ID
		},{	name : 'crte_urif'			, type: 'string'	//생성UI
		}
	]
});