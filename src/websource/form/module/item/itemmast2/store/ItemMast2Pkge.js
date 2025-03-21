Ext.define('module.item.itemmast2.store.ItemMast2Pkge', { extend:'Axt.data.Store',
	model: 'module.item.itemmast2.model.ItemMast2Pkge',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast2/get/item_pkge.do",
			update : _global.api_host_info + "/system/item/itemmast2/set/item_pkge.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
