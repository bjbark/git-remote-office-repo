Ext.define('module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sorderplan.model.SorderPlanDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/sale/order/sorderplan/get/detail.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
