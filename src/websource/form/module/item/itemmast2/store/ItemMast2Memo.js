Ext.define('module.item.itemmast2.store.ItemMast2Memo', { extend:'Axt.data.Store',
	model: 'module.item.itemmast2.model.ItemMast2Memo',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast2/get/item_memo.do",
			update : _global.api_host_info + "/system/item/itemmast2/set/item_memo.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
