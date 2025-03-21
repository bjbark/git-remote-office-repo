Ext.define('module.basic.item.eco.ecomast.store.EcoMastDetail', { extend:'Axt.data.Store',
	model: 'module.basic.item.eco.ecomast.model.EcoMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/basic/item/eco/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
