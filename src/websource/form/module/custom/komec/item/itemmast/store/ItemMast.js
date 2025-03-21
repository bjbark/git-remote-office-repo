Ext.define('module.custom.komec.item.itemmast.store.ItemMast', { extend:'Axt.data.Store',
	model: 'module.custom.komec.item.itemmast.model.ItemMast',
	autoLoad  : false,
	remoteSort: true,
//	pageSize: 99999999,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/komec/item/itemmast/get/search.do",
			update : _global.api_host_info + "/system/custom/komec/item/itemmast/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
