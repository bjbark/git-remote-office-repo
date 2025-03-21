Ext.define('module.custom.aone.item.itemclass.store.ItemClassExcel', 
{ extend:'module.custom.aone.item.itemclass.store.ItemClass',
	model:'module.custom.aone.item.itemclass.model.ItemClassExcel',
	autoLoad: false, 
	pageSize: Const.SELECT.rows, 
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/aone/item/itemclass/get/search/excel.do"
		}, 
		extraParams:{ token : _global.token_id }
	}
});