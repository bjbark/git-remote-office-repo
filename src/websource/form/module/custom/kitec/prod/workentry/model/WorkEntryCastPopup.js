Ext.define('module.custom.kitec.prod.workentry.model.WorkEntryCastPopup',{ extend:'Axt.data.Model',
	fields : [
		{	name : 'cond_dvcd'			, type : 'string'
		},{	name : 'cond_dvcd_name'		, type : 'string'
		},{	name : 'line_seqn'			, type : 'string'
		},{	name : 'cond_name'			, type : 'string'
		},{	name : 'stup_veri'			, type : 'string'
		},{	name : 'unit_name'			, type : 'string'
		},{	name : 'frst_msmt'			, type : 'string'
		},{	name : 'send_msmt'			, type : 'string'
		},{	name : 'thrd_msmt'			, type : 'string'
		},{	name : 'invc_date'			, type : 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'cvic_idcd'			, type : 'string'
		},{	name : 'wkct_idcd'			, type : 'string'
		},

	]
});
