Ext.define('module.item.itemmast3.store.ItemMast3', { extend:'Axt.data.Store',
	model: 'module.item.itemmast3.model.ItemMast3',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast3/get/search.do",
			update : _global.api_host_info + "/system/item/itemmast3/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
