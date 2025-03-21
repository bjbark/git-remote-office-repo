Ext.define('module.custom.komec.eis.eisreport.model.EisReport',{ extend:'Axt.data.Model',
	fields:[
		{name: 'cvic_name'		, type: 'string'  },
		{name: 'pdod_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },
		{name: 'item_name'		, type: 'string'  },
		{name: 'indn_qntt'		, type: 'float'  },
		{name: 'prog_stat_dvcd'	, type: 'string'  },
		{name: 'prod_qntt'		, type: 'float'  },
		{name: 'poor_qntt'		, type: 'float'  },
		{name: 'gauge'			, type: 'float'  },
	]
});
