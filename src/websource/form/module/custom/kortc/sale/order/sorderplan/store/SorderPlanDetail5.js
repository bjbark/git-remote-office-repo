Ext.define('module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail5', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sorderplan.model.SorderPlanDetail3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/sale/order/sorderplan/set/bom.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
