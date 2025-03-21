Ext.define('module.custom.aone.sale.order.sorderplan.store.SorderPlanMtrl', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderplan.model.SorderPlanMtrl',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sorderplan/get/mtrl.do",
			update: _global.api_host_info + "/system/custom/aone/sale/order/sorderplan/set/mtrl.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
