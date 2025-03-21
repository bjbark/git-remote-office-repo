Ext.define('module.custom.sjflv.sale.order.oemmast.model.OemMastDetail', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_date'		, type: 'string'	, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'qntt'			, type: 'float'
		},{	name: 'invc_numb'		, type: 'string'
		},{	name: 'lott_numb'		, type: 'string'
		},{	name: 'wrhs_name'		, type: 'string'
		},{	name: 'item_code'		, type: 'string'
		},{	name: 'item_name'		, type: 'string'
		},{	name: 'item_spec'		, type: 'string'
		},{	name: 'bzpl_idcd'		, type: 'string'
		},{	name: 'invc_dvcd'		, type: 'string'
		},{	name: 'line_seqn'		, type: 'float'
		},{	name: 'stok_type_dvcd'	, type: 'string'
		},{	name: 'orig_invc_numb'	, type: 'string'
		},{	name: 'make_cost'		, type: 'float'
		},{	name: 'orig_seqn'		, type: 'float'
		},{	name: 'lot_line_seqn'	, type: 'float'
		},{	name: 'assi_seqn'		, type: 'float'
		},{	name: 'item_gubun'		, type: 'string'
		},{	name: 'mixx_rate'		, type: 'string'
		},{	name: 'istt_qntt'		, type: 'string'
		},{	name: 'istt_pric'		, type: 'string'
		},{	name: 'istt_amnt'		, type: 'float'	
			
		}
	]
});
