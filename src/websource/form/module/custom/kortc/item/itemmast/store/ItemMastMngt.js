Ext.define('module.custom.kortc.item.itemmast.store.ItemMastMngt', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.item.itemmast.model.ItemMastMngt',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast/get/item_mngt.do",
			update : _global.api_host_info + "/system/item/itemmast/set/item_mngt.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
