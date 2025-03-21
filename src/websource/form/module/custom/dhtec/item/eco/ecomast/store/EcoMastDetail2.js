Ext.define('module.custom.dhtec.item.eco.ecomast.store.EcoMastDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.dhtec.item.eco.ecomast.model.EcoMastDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/basic/item/eco/get/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
