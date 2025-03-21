Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister2',{ extend:'Axt.data.Model',
	fields:[
		{name: 'item_code'		, type: 'string'  , defaultValue : _global.hq_id},
		{name: 'item_name'		, type: 'string'  },
		{name: 'item_spec'		, type: 'string'  },
		{name: 'lott_numb'		, type: 'string'  },
		{name: 'istt_date'		, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'rtil_ddln_date'	, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'prnt_idcd'		, type: 'string'  },
		{name: 'stok_qntt'		, type: 'float'  },
		{name: 'istt_qntt'		, type: 'float'  },
	]
});
