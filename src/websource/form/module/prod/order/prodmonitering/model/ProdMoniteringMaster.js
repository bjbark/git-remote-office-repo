Ext.define('module.prod.order.prodmonitering.model.ProdMoniteringMaster',{ extend:'Axt.data.Model',
	fields : [
		{name: 'dept_name'				, type: 'string'},		//
		{name: 'cvic_idcd'				, type: 'string'},		//
		{name: 'cvic_name'				, type: 'string'},		//
		{name: 'runn_stat'				, type: 'string'},		//
		{name: 'lott_numb'				, type: 'string'},		//
		{name: 'mold_idcd'				, type: 'string'},		//
		{name: 'item_idcd'				, type: 'string'},		//
		{name: 'mtrl_name'				, type: 'string'},		//
		{name: 'cavity'					, type: 'string'},		//
		{name: 'work_strt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//

		{name: 'cycl_time'				, type: 'float '},		//
		{name: 'indn_qntt'				, type: 'float '},		//
		{name: 'plan_shot'				, type: 'float '},		//
		{name: 'runn_shot'				, type: 'float '},		//
		{name: 'work_strt_dttm '		, type: 'string'},		//
		{name: 'runn_time'				, type: 'float' },		//
		{name: 'loss_time'				, type: 'float' },		//
		{name: 'runn_rate'				, type: 'float' },		//


	]
});
