Ext.define('module.custom.kortc.sale.order.sorderosttview.store.SorderOsttViewMaster2', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sorderosttview.model.SorderOsttViewMaster2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/sale/order/sorderosttview/get/master2.do",
//			update: _global.api_host_info + "/system/custom/kortc/sale/order/sorderosttview/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
