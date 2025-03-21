Ext.define('module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewDetail', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/order/estimast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
