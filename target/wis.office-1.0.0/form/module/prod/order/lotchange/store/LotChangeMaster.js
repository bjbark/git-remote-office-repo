Ext.define('module.prod.order.lotchange.store.LotChangeMaster', { extend:'Axt.data.Store',
	model: 'module.prod.order.lotchange.model.LotChangeMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/lotchange/get/search.do",
			update: _global.api_host_info + "/system/sale/order/lotchange/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
