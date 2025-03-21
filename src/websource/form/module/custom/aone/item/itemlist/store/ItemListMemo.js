Ext.define('module.custom.aone.item.itemlist.store.ItemListMemo', { extend:'Axt.data.Store',
	model: 'module.custom.aone.item.itemlist.model.ItemListMemo',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast/get/item_memo.do",
			update : _global.api_host_info + "/system/item/itemmast/set/item_memo.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
