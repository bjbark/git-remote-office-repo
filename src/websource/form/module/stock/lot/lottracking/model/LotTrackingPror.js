Ext.define('module.stock.lot.lottracking.model.LotTrackingPror',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//
		{name: 'line_seqn',				type: 'float '},		//
		{name: 'wkct_name',				type: 'string'},		//
		{name: 'work_strt_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'work_endd_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'cvic_name',				type: 'string'},		//
		{name: 'prog_stat_dvcd',		type: 'string'},		//
	]
});
