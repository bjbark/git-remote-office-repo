Ext.define('module.custom.komec.stock.isos.prodosttwork.model.ProdOsttWorkDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name : 'invc_numb'		, type : 'string'
		},{	name : 'invc_date'		, type : 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'bzpl_idcd'		, type : 'string'
		},{	name : 'ostt_dvcd'		, type : 'string'
		},{	name : 'cstm_name'		, type : 'string'
		},{	name : 'ostt_usge_bacd'	, type : 'string'
		},{	name : 'drtr_idcd'		, type : 'string'
		},{	name : 'line_seqn'		, type : 'float'
		},{	name : 'rownumberer'	, type : 'float', defaultValue : 1
		},{	name : 'ostt_wrhs_idcd'	, type : 'string'
		},{	name : 'wkod_numb'		, type : 'string'
		},{	name : 'ostt_resn_dvcd'	, type : 'string'
		},{	name : 'item_idcd'		, type : 'string'
		},{	name : 'zone_idcd'		, type : 'string'
		},{	name : 'unit_idcd'		, type : 'string'
		},{	name : 'stnd_unit'		, type : 'string'
		},{	name : 'reqt_qntt'		, type : 'float'
		},{	name : 'ostt_qntt'		, type : 'float'
		},{	name : 'istt_qntt'		, type : 'float'
		},{	name : 'stnd_unit_qntt'	, type : 'float'
		},{	name : 'stnd_pric'		, type : 'float'
		},{	name : 'vatx_incl_yorn'	, type : 'string'
		},{	name : 'vatx_rate'		, type : 'float'
		},{	name : 'amnt'			, type : 'float'
		},{	name : 'vatx_amnt'		, type : 'float'
		},{	name : 'ttsm_amnt'		, type : 'float'
		},{	name : 'curr_stok_qntt'	, type : 'float'
		},{	name : 'mtrl_ostt_qntt'	, type : 'float'
		},{	name : 'lott_numb'		, type : 'string'
		},{	name : 'lott_mngt_yorn'	, type : 'string'
		},{	name : 'wkct_item_idcd'	, type : 'string'
		},{	name : 'orig_invc_numb'	, type : 'string'
		},{	name : 'orig_seqn'		, type : 'string'
		},{	name : 'remk_text'		, type : 'string'
		},{	name : 'uper_seqn'		, type : 'int'
		},{	name : 'disp_seqn'		, type : 'int'
		},{	name : 'wrhs_name'		, type : 'string'
		},{	name : 'ostt_wrhs_name'	, type : 'string'
		},{	name : 'cstm_name'		, type : 'string'
		},{	name : 'item_name'		, type : 'string'
		},{	name : 'item_code'		, type : 'string'
		},{	name : 'item_spec'		, type : 'string'
		},{	name : 'unit_name'		, type : 'string'
		}
	],
	recalculation: function(inv) {
		var row = this,
			baseamt = row.get('ostt_qntt') * row.get('stnd_pric')
		;
		row.set('amnt'		, row.get('ostt_qntt') * row.get('stnd_pric')  );
	}
});