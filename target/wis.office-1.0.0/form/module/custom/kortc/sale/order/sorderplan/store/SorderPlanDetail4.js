Ext.define('module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail4', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sorderplan.model.SorderPlanDetail4',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/kortc/sale/order/sorderplan/get/detail4.do",
			update : _global.api_host_info + "/system/custom/kortc/sale/order/sorderplan/set/popup.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
