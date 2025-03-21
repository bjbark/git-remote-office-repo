Ext.define('module.prod.plan.rsvdorder.store.RsvdOrderMaster', { extend:'Axt.data.Store',
	model: 'module.prod.plan.rsvdorder.model.RsvdOrderMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/prod/plan/rsvdorder/get/search.do",
			update: _global.api_host_info + "/system/prod/plan/rsvdorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
