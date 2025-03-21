Ext.define('module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster3', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewMaster3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sorderosttview/get/master3.do",
//			update: _global.api_host_info + "/system/sale/order/estimast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
