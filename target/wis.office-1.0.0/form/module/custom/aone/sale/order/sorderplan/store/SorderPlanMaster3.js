Ext.define('module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster3', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sorderplan.model.SorderPlanDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sorderplan/get/master3.do",

		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
