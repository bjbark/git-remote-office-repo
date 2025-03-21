Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister3',{ extend:'Axt.data.Model',
	fields:[
		{name: 'invc_numb'		, type: 'string'  , defaultValue : _global.hq_id},
		{name: 'line_seqn'		, type: 'float'   },
		{name: 'deli_date'		, type: 'string'   , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'cstm_name'		, type: 'string' },
		{name: 'item_code'		, type: 'string' },
		{name: 'item_name'		, type: 'string' },
		{name: 'item_spec'		, type: 'string' },
		{name: 'unit_name'		, type: 'string' },
		{name: 'qntt'			, type: 'float'  },
		{name: 'offr_qntt'		, type: 'float'  },
	]
});
