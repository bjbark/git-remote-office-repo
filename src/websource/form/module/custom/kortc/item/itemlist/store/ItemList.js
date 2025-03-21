Ext.define('module.custom.kortc.item.itemlist.store.ItemList', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.item.itemlist.model.ItemList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/custom/kortc/item/itemlist/get/search.do",
			 update : _global.api_host_info + "/system/custom/kortc/item/itemlist/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
