Ext.define('module.workshop.sale.order.estimast.model.ItemPopup', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'clss_idcd'			, type: 'string' 	/* idcd	*/
		},{	name: 'clss_name'			, type: 'string' 	/* 대분류명		*/



		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'line_levl'			, type: 'float', defaultValue: '0'
		},{	name: 'line_ordr'			, type: 'float', defaultValue: '0'
		},{	name: 'line_stat'			, type: 'float', defaultValue: '0'
		},{	name: 'line_clos'			, type: 'float', defaultValue: '0'
		},{	name: 'find_name'			, type: 'string'
		},{	name: 'updt_user_name'		, type: 'string'
		},{	name: 'updt_ipad'			, type: 'string'
		},{	name: 'updt_dttm'			, type: 'string'
		},{	name: 'updt_idcd'			, type: 'string'
		},{	name: 'updt_urif'			, type: 'string'
		},{	name: 'crte_user_name'		, type: 'string'
		},{	name: 'crte_ipad'			, type: 'string'
		},{	name: 'crte_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'crte_idcd'			, type: 'string'
		},{	name: 'crte_urif'			, type: 'string'
		},
	]
});