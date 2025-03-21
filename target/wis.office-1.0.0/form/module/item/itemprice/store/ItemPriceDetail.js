Ext.define('module.item.itemprice.store.ItemPriceDetail', { extend:'Axt.data.Store',
	model: 'module.item.itemprice.model.ItemPriceDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/item/itemprice/get/detail.do",
			update	: _global.api_host_info + "/system/item/itemprice/set/detail.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
