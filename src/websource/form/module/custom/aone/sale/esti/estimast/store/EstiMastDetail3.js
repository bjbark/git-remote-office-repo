Ext.define('module.custom.aone.sale.esti.estimast.store.EstiMastDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.esti.estimast.model.EstiMastDetail3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/aone/sale/estimast/get/detail3.do"
			,update : _global.location.http() +"/custom/aone/sale/estimast/set/detail3.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
