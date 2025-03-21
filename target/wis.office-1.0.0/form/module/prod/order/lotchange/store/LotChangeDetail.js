Ext.define('module.prod.order.lotchange.store.LotChangeDetail', { extend:'Axt.data.Store',
	model: 'module.prod.order.lotchange.model.LotChangeDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/order/lotchange/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
