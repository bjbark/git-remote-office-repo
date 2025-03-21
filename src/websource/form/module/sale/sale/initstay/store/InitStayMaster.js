Ext.define('module.sale.sale.initstay.store.InitStayMaster', { extend:'Axt.data.Store',
	model: 'module.sale.sale.initstay.model.InitStayMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/sale/initstay/get/search.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
