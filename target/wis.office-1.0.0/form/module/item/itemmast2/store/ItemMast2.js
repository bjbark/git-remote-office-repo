Ext.define('module.item.itemmast2.store.ItemMast2', { extend:'Axt.data.Store',
	model: 'module.item.itemmast2.model.ItemMast2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast2/get/search.do",
			update : _global.api_host_info + "/system/item/itemmast2/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
