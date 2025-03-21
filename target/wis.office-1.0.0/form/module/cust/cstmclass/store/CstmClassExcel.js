Ext.define('module.cust.cstmclass.store.CstmClassExcel', { extend:'module.cust.cstmclass.store.CstmClass',
	model:'module.cust.cstmclass.model.CstmClassExcel',
	autoLoad: false, 
	pageSize: Const.SELECT.rows, 
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/cstmclass/get/search/excel.do"
		}, 
		extraParams:{ token : _global.token_id }
	}
});