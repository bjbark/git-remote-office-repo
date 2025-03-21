Ext.define('module.custom.aone.sale.esti.estimast.store.EstiMastMaster2', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.esti.estimast.model.EstiMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/aone/sale/estimast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
