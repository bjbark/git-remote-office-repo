Ext.define('module.sale.sale.initstay.store.InitStayWorkerLister', { extend:'Axt.data.Store',
	model: 'module.sale.sale.initstay.model.InitStayMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/sale/initstay/get/search2.do",
//			update: _global.api_host_info + "system/sale.sale.initstay/get/search2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
