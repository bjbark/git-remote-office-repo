Ext.define('lookup.popup.model.LottPopup',{ extend:'Axt.data.Model',
	fields:[
		{	name: 'lott_numb'	, type: 'string'
		},{	name: 'wrhs_idcd'	, type: 'string'
		},{	name: 'item_idcd'	, type: 'string'
		},{	name: 'item_code'	, type: 'string'
		},{	name: 'item_name'	, type: 'string'
		},{	name: 'acct_bacd'	, type: 'string'
		},{	name: 'acct_name'	, type: 'string'
		},{	name: 'istt_date'	, type: 'string',  convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'ostt_date'	, type: 'string',  convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'istt_qntt'	, type: 'float'
		},{	name: 'ostt_qntt'	, type: 'float'
		},{	name: 'chge_qntt'	, type: 'float'
		},{	name: 'stok_qntt'	, type: 'float'
		},{	name: 'tagg_dvcd'	, type: 'string'
		},{	name: 'user_memo'	, type: 'string'
		},{	name: 'item_spec'	, type: 'string'
		},{	name: 'modl_name'	, type: 'string'
		},{	name: 'wrhs_name'	, type: 'string'
		},{	name: 'stok_type_dvcd'	, type: 'string'
		},{	name: 'pric'		, type: 'float'
		},{	name: 'qntt'		, type: 'float'
		},{	name: 'ostt_qntt2'		, type: 'float'
		},{	name: 'line_stat'	, type: 'string'
		},{	name: 'line_ordr'	, type: 'int', defaultvalue : 0
		},{	name: 'make_date'	, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
	}

	]
});
