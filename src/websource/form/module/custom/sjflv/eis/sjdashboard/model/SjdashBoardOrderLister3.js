Ext.define('module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister3',{ extend:'Axt.data.Model',
	fields:[
		{name: 'cstm_name'		, type: 'string'  },
		{name: 'item_name'		, type: 'string'  },
		{name: 'item_spec'		, type: 'string'  },
		{name: 'deli_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{name: 'user_name'		, type: 'string'  },
		{name: 'invc_qntt'		, type: 'float '  }
	]
});
