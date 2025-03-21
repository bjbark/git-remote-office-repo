Ext.define('module.stock.lot.lottracking.model.LotTrackingProd',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//
		{name: 'lott_numb',				type: 'string'},		//
		{name: 'wkct_name',				type: 'string'},		//
		{name: 'wkct_idcd',				type: 'string'},		//
		{name: 'wkct_name',				type: 'string'},		//
		{name: 'prog_stat_dvcd',		type: 'string'},		//
		{name: 'work_strt_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//
		{name: 'work_endd_dttm',		type: 'string', convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//

		{name: 'item_idcd',				type: 'string'},		//
		{name: 'item_code',				type: 'string'},		//
		{name: 'item_name',				type: 'string'},		//
		{name: 'ivst_qntt',				type: 'float '},		//
	]
});
