Ext.define('module.custom.aone.item.itemlist.store.ItemList', { extend:'Axt.data.Store',
	model: 'module.custom.aone.item.itemlist.model.ItemList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/custom/aone/item/itemmast/get/search.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
