Ext.define('module.custom.dhtec.item.eco.ecomast.store.EcoMastPopup', { extend:'Axt.data.Store',
	model: 'module.custom.dhtec.item.eco.ecomast.model.EcoMastDetail',
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
