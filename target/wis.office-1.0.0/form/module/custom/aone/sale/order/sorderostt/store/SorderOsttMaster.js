Ext.define('module.custom.aone.sale.order.sorderostt.store.SorderOsttMaster', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderostt.model.SorderOsttMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sorderostt/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
