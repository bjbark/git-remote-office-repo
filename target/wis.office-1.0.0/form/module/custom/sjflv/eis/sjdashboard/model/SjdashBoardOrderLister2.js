Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister2',{ extend:'Axt.data.Model',
	fields:[
		{name: 'dvcd'			, type: 'string'  },
		{name: 'cstm_name'		, type: 'string'  },
		{name: 'item_name'		, type: 'string'  },
		{name: 'item_spec'		, type: 'string'  },
		{name: 'deli_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'user_name'		, type: 'string'  },
		{name: 'invc_qntt'		, type: 'float '  },
		{name: 'invc_date'		, type: 'string ', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'dely_cstm_name'	, type: 'float '  }
	]
});
