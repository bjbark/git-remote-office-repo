Ext.define('module.item.itemmast2.store.ItemMast2Mngt', { extend:'Axt.data.Store',
	model: 'module.item.itemmast2.model.ItemMast2Mngt',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast2/get/item_mngt.do",
			update : _global.api_host_info + "/system/item/itemmast2/set/item_mngt.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
