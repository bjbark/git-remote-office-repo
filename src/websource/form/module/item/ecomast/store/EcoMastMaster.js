Ext.define('module.item.ecomast.store.EcoMastMaster', { extend:'Axt.data.Store',
	model: 'module.item.ecomast.model.EcoMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/item/ecomast/get/search.do",
			update: _global.api_host_info + "/system/item/ecomast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
