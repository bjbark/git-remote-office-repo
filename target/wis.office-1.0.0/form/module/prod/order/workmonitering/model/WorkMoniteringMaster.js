Ext.define('module.prod.order.workmonitering.model.WorkMoniteringMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'wkct_name'				, type: 'string'},		//
		{name: 'cvic_name'				, type: 'string'},		//
		{name: 'runn_stat'				, type: 'string'},		//
		{name: 'drtr_name'				, type: 'string'},		//
		{name: 'item_name'				, type: 'string'},		//
		{name: 'work_strt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//

	]
});
