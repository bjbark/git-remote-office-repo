Ext.define('module.custom.sjflv.item.bomlist.model.BomListExcel',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'id'					, type: 'string'
		},{	name: 'prnt_item_idcd'		, type: 'string'
		},{ name: 'ivst_item_idcd'		, type: 'string'
		},{ name: 'line_seqn'			, type: 'int'
		},{	name: 'item_idcd'			, type: 'string'
		},{	name: 'item_name'			, type: 'string'
		},{	name: 'item_code'			, type: 'string'
		},{	name: 'item_spec'			, type: 'string'
		},{	name: 'mixx_rate'			, type: 'float'
		},{	name: 'ofap_mixx_rate'		, type: 'float'
		},{	name: 'adpt_date'			, type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr
		},{	name: 'kfda'				, type: 'string'
		},{	name: 'fema'				, type: 'string'
		},{	name: 'seqc'				, type: 'string'
		},{	name: 'wdgb'				, type: 'string'
		},{	name: 'caca'				, type: 'string'
		},{	name: 'algy_yorn'			, type: 'string'
		}
	],
	idProperty: 'id'+'excel'
});
