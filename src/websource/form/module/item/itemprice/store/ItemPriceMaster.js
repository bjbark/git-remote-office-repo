Ext.define('module.item.itemprice.store.ItemPriceMaster', { extend:'Axt.data.Store',
	model: 'module.item.itemprice.model.ItemPriceMaster',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/item/itemprice/get/search.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
