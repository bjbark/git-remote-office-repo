Ext.define('module.custom.komec.eis.eisreport.model.EisReportGraph',{ extend:'Axt.data.Model',
	fields:[
		{name: 'dttm'			, type: 'string'  , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateTimeToStr},
		{name: 'rpm'			, type: 'float'  },
		{name: 'temperature'	, type: 'float'  },
		{name: 'wkct_name'		, type: 'string' },
	]
});
