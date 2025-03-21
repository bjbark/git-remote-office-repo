Ext.define('module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderplan.model.SorderPlanMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sorderplan/get/search.do",
			update: _global.api_host_info + "/system/custom/aone/sale/order/sorderplan/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
