Ext.define('module.custom.kortc.prod.order.porderplan.store.PorderPlanPror', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderplan.model.PorderPlanPror',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/kortc/prod/order/porderplan/get/pror.do",
			update : _global.api_host_info + "/system/custom/kortc/prod/order/porderplan/set/prorDelete.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
