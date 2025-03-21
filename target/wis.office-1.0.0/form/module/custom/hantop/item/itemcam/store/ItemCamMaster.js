Ext.define('module.custom.hantop.item.itemcam.store.ItemCamMaster', { extend:'Axt.data.Store',
	model    : 'module.custom.hantop.item.itemcam.model.ItemCamMaster',
	autoLoad : false,
	remoteSort: true,
	pageSize : Const.SELECT.rows,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/hantop/item/itemcam/get/search.do",
			update : _global.api_host_info + "/system/custom/hantop/item/itemcam/set/record.do"
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

