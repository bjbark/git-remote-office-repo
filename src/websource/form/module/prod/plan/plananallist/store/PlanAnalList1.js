Ext.define('module.prod.plan.plananallist.store.PlanAnalList1', { extend:'Axt.data.Store',
	model: 'module.prod.plan.plananallist.model.PlanAnalList1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/plan/plananallist/get/search1.do",
//		   update: _global.api_host_info + "/system/prod/plan/plananallist/set/invoice.do"
		},
		actionMethods: { read : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});