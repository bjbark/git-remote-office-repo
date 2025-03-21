Ext.define('module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderplan.model.PorderPlanMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/prod/order/porderplan/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
