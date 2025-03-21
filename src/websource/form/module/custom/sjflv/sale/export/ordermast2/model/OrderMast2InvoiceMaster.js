Ext.define('module.custom.sjflv.sale.export.ordermast2.model.OrderMast2InvoiceMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//invoice번호
		},{	name: 'cust_invc_numb'		, type: 'string'	//커스텀invoice번호
		},{	name: 'amnd_degr'			, type: 'float'  , defaultValue: 1		//amd차수
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr//invoice일자
		},{	name: 'bzpl_idcd'			, type: 'string' 	//사업장id
		},{	name: 'bzpl_name'			, type: 'string' 	//사업장명
		},{	name: 'expt_dvcd'			, type: 'string'	//
		},{	name: 'mngt_numb'			, type: 'string'	//
		},{	name: 'cstm_pcod_numb'		, type: 'string'	//
		},{	name: 'ship_viaa_dvcd'		, type: 'string'	//
		},{	name: 'buyr_name'			, type: 'string' 	//customer idcd
		},{	name: 'cstm_idcd'			, type: 'string' 	//customer name
		},{	name: 'cstm_name'			, type: 'string' 	//customer name
		},{	name: 'mdtn_prsn'			, type: 'string'	//
		},{	name: 'drtr_idcd'			, type: 'string', defaultValue : _global.login_id	//
		},{	name: 'drtr_name'			, type: 'string', defaultValue : _global.login_nm	//
		},{	name: 'pric_cond_dvcd'		, type: 'string'	//D
		},{	name: 'trde_stot_dvcd'		, type: 'string'	//
		},{	name: 'trde_trnt_dvcd'		, type: 'string'	//
		},{	name: 'stot_time_dvcd'		, type: 'string'	//
		},{	name: 'stot_ddln'			, type: 'string'	//
		},{	name: 'mney_unit'			, type: 'string'	//
		},{	name: 'exrt'				, type: 'float', defaultValue: 0	//환율
		},{	name: 'ship_port'			, type: 'string'	//
		},{	name: 'etdd'				, type: 'string'	//
		},{	name: 'dsch_port'			, type: 'string'	//
		},{	name: 'etaa'				, type: 'string'	//
		},{	name: 'arvl_port'			, type: 'string'	//
		},{	name: 'ostt_schd_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//
		},{	name: 'pckg_unit'			, type: 'string'	//
		},{	name: 'ogin_name'			, type: 'string'	//
		},{	name: 'vldt'				, type: 'string'	//
		},{	name: 'orig_invc_numb'		, type: 'string'	//
		},{	name: 'orig_amnd_degr'		, type: 'float'		//
		},{	name: 'dsct_yorn'			, type: 'string'	//
		},{	name: 'expt_lcal_name'		, type: 'string'	//
		},{	name: 'modify'		, type: 'string' 	//지급처


		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		}
	]
});