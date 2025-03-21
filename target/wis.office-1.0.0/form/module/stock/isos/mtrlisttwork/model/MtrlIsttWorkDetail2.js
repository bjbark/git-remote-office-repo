Ext.define('module.stock.isos.mtrlisttwork.model.MtrlIsttWorkDetail2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호	*/
		},{	name: 'invc_numb'			, type: 'string'
		},{	name: 'line_seqn'			, type: 'int'	, defaultValue : 1
		},{	name: 'istt_wrhs_idcd'		, type: 'string'
		},{	name: 'item_idcd'			, type: 'string'
		},{	name: 'item_code'			, type: 'string'
		},{	name: 'item_name'			, type: 'string'
		},{	name: 'item_spec'			, type: 'string'
		},{	name: 'item_unit'			, type: 'string'
		},{	name: 'istt_pric'			, type: 'float'	, defaultValue : 0
		},{	name: 'not_dlvy_qntt'		, type: 'float'	, defaultValue : 0
		},{	name: 'istt_qntt'			, type: 'float'	, defaultValue : 0
		},{	name: 'vatx_incl_yorn'		, type: 'string'
		},{	name: 'vatx_rate'			, type: 'float'	, defaultValue : 0
		},{	name: 'istt_amnt'			, type: 'float'	, defaultValue : 0
		},{	name: 'istt_vatx'			, type: 'float'	, defaultValue : 0
		},{	name: 'ttsm_amnt'			, type: 'float'	, defaultValue : 0
		},{	name: 'krwn_pric'			, type: 'float'	, defaultValue : 0
		},{	name: 'krwn_amnt'			, type: 'float'	, defaultValue : 0
		},{	name: 'krwn_vatx'			, type: 'float'	, defaultValue : 0
		},{	name: 'krwn_amnt_totl'		, type: 'float'	, defaultValue : 0
		},{	name: 'pric_dvcd'			, type: 'string'
		},{	name: 'cstm_idcd'			, type: 'string'
		},{	name: 'stnd_unit'			, type: 'string'
		},{	name: 'stnd_unit_qntt'		, type: 'float'	, defaultValue : 0
		},{	name: 'paym_dvcd'			, type: 'string'
		},{	name: 'lott_numb'			, type: 'string'
		},{	name: 'sral_strt_numb'		, type: 'string'
		},{	name: 'sral_endd_numb'		, type: 'string'
		},{	name: 'remk_text'			, type: 'string'
		},{	name: 'prof_data'			, type: 'string'
		},{	name: 'istt_insp_yorn'		, type: 'string'
		},{	name: 'insp_date'			, type: 'string',convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'insp_drtr_idcd'		, type: 'string'
		},{	name: 'insp_mthd_dvcd'		, type: 'string'
		},{	name: 'insp_qntt'			, type: 'float'	, defaultValue : 0
		},{	name: 'pass_qntt'			, type: 'float'	, defaultValue : 0
		},{	name: 'poor_qntt'			, type: 'float'	, defaultValue : 0
		},{	name: 'poor_caus_dvcd'		, type: 'string'
		},{	name: 'poor_caus_name'		, type: 'string'
		},{	name: 'judt_dvcd'			, type: 'string'
		},{	name: 'orig_invc_numb'		, type: 'string'
		},{	name: 'orig_amnd_degr'		, type: 'string'
		},{	name: 'orig_seqn'			, type: 'int'
		},{	name: 'uper_seqn'			, type: 'int'	, defaultValue : 1
		},{	name: 'disp_seqn'			, type: 'int'	, defaultValue : 1
		},{	name: 'user_memo'			, type: 'string'
		},{	name: 'sysm_memo'			, type: 'string'
		},{	name: 'prnt_idcd'			, type: 'string'
		},{	name: 'line_levl'			, type: 'int'
		},{	name: 'line_ordr'			, type: 'int'
		},{	name: 'line_stat'			, type: 'string'
		},{	name: 'line_clos'			, type: 'string'
		},{	name: 'find_name'			, type: 'string'
		},{	name: 'updt_user_name'		, type: 'string'
		},{	name: 'updt_ipad'			, type: 'string'
		},{	name: 'updt_dttm'			, type: 'string'
		},{	name: 'updt_idcd'			, type: 'string'
		},{	name: 'updt_urif'			, type: 'string'
		},{	name: 'crte_user_name'		, type: 'string'
		},{	name: 'crte_ipad'			, type: 'string'
		},{	name: 'crte_dttm'			, type: 'string'
		},{	name: 'crte_idcd'			, type: 'string'
		},{	name: 'crte_urif'			, type: 'string'
		}
	],
	recalculation: function(inv) {
		var row = this,
			baseamt = row.get('istt_qntt') * row.get('istt_pric')
		;
		row.set('istt_amnt'	, row.get('istt_qntt') * row.get('istt_pric')  );
	}
});