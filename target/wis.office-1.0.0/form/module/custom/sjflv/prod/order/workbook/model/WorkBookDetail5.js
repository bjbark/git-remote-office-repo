Ext.define('module.custom.sjflv.prod.order.workbook.model.WorkBookDetail5',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb'				, type: 'string' },		//INVOICE번호
		{name: 'invc_date'				, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//INVOICE일자
		{name: 'line_seqn'				, type: 'float'	 },
		{name: 'insp_type_idcd'			, type: 'string' },
		{name: 'wkct_idcd'				, type: 'string' },
		{name: 'frst_msmt'				, type: 'string' },
		{name: 'frst_msmt_2hr'			, type: 'string' },
		{name: 'remk_text'				, type: 'string' },
		{name: 'insp_sbsc_name'			, type: 'string' },
		{name: 'wkct_code'				, type: 'string' },
	]
});
