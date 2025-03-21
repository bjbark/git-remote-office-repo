Ext.define('module.item.itemunit.store.ItemUnit', {extend:'Axt.data.Store',
	model :'module.item.itemunit.model.ItemUnit',
	autoLoad: false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemunit/get/search.do",
			update : _global.api_host_info + "/system/item/itemunit/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{
			token   : _global.token_id
		}
	}
});