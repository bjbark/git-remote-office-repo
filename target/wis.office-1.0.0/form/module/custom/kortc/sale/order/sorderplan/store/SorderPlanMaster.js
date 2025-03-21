Ext.define('module.custom.kortc.sale.order.sorderplan.store.SorderPlanMaster', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sorderplan.model.SorderPlanMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/sale/order/sorderplan/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
