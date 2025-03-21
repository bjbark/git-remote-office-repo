Ext.define('module.prod.plan.plananallist.store.PlanAnalList2', { extend:'Axt.data.Store',
	model: 'module.prod.plan.plananallist.model.PlanAnalList2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/prod/plan/plananallist/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});