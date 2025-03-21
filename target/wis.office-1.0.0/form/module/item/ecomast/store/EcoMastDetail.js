Ext.define('module.item.ecomast.store.EcoMastDetail', { extend:'Axt.data.Store',
	model: 'module.item.ecomast.model.EcoMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/item/ecomast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
