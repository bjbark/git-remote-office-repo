Ext.define('module.custom.sjflv.item.itemmast.store.ItemMastPkge', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.item.itemmast.model.ItemMastPkge',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/item/itemmast/get/item_pkge.do",
			update : _global.api_host_info + "/system/custom/sjflv/item/itemmast/set/item_pkge.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
