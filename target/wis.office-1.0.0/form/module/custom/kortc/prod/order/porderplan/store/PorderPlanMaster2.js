Ext.define('module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster2', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderplan.model.PorderPlanMaster2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/prod/order/porderplan/get/search2.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
