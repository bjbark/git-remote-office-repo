Ext.define('module.custom.komec.item.itemlist.store.ItemList', { extend:'Axt.data.Store',
	model: 'module.custom.komec.item.itemlist.model.ItemList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/custom/komec/item/itemmast/get/search.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
