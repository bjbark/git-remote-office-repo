Ext.define('module.item.itemclass.store.ItemClassExcel', { extend:'module.item.itemclass.store.ItemClass',
	model:'module.item.itemclass.model.ItemClassExcel',
	autoLoad: false, 
	pageSize: Const.SELECT.rows, 
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemclass/get/search/excel.do"
		}, 
		extraParams:{ token : _global.token_id }
	}
});