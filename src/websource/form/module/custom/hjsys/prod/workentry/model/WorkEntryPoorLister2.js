Ext.define('module.custom.hjsys.prod.workentry.model.WorkEntryPoorLister2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'invc_numb'		, type: 'string' },
		{	name: 'wkct_name'		, type: 'string' },
		{	name: 'poor_qntt'		, type: 'flaot'  },
		{	name: 'poor_bacd'		, type: 'string' },
		{	name: 'poor_name'		, type: 'string' },
		{	name: 'sttm'			, type: 'string' , convert : Ext.util.Format.strToTime},
		{	name: 'edtm'			, type: 'string' , convert : Ext.util.Format.strToTime},
	]
});

