Ext.define('lookup.popup.model.PurcOrdrPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'
		},{	name: 'invc_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'
		},{	name: 'cstm_name'			, type: 'string'
		},{	name: 'cstm_code'			, type: 'string'
		},{	name: 'boss_name'			, type: 'string'
		},{	name: 'istt_wrhs_name'		, type: 'string'
		},{	name: 'istt_wrhs_idcd'		, type: 'string'
		},{	name: 'line_seqn'			, type: 'string'
		},{	name: 'line_stat1'			, type: 'string'
		},{	name: 'item_idcd'			, type: 'string'
		},{	name: 'item_code'			, type: 'string'
		},{	name: 'item_name'			, type: 'string'
		},{	name: 'item_spec'			, type: 'string'
		},{	name: 'unit_idcd'			, type: 'string'
		},{	name: 'unit_name'			, type: 'string'
		},{	name: 'offr_qntt'			, type: 'float'
		},{	name: 'offr_pric'			, type: 'float'
		},{	name: 'offr_amnt'			, type: 'float'
		},{	name: 'offr_vatx'			, type: 'float'
		},{	name: 'ttsm_amnt'			, type: 'float'
		},{	name: 'flvy_qntt'			, type: 'float'
		},{	name: 'not_dlvy_qntt'		, type: 'float'
		},{	name: 'dlvy_qntt'			, type: 'float'
		},{	name: 'deli_date'			, type: 'string'
		},{	name: 'orig_invc_numb'		, type: 'string'
		},{	name: 'orig_amnd_degr'		, type: 'string'
		},{	name: 'amnd_degr'			, type: 'string'
		},{	name: 'orig_seqn'			, type: 'string'
		},{	name: 'modl_name'			, type: 'string'
		}
	]
});





