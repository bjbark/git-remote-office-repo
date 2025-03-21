Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister4',{ extend:'Axt.data.Model',
	fields:[
		{name: 'dvcd'			, type: 'string'  },
		{name: 'cstm_idcd'		, type: 'string'  },
		{name: 'cstm_name'		, type: 'string'  },
		{name: 'item_idcd'		, type: 'string'  },
		{name: 'item_name'		, type: 'string'  },
		{name: 'item_code'		, type: 'string'  },
		{name: 'item_spec'		, type: 'string'  },
		{name: 'unit_name'		, type: 'string'  },
		{name: 'istt_qntt'		, type: 'float'   },
		{name: 'lott_numb'		, type: 'string'  },
		{name: 'make_natn'		, type: 'string'  },
		{name: 'make_date'		, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'rtil_ddln_date'	, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'qntt'			, type: 'float'   },
		{name: 'remk_text'		, type: 'strint'  },
	]
});
