Ext.define('module.prod.plan.rsvdorder.store.RsvdOrderDetail', { extend:'Axt.data.Store',
	model: 'module.prod.plan.rsvdorder.model.RsvdOrderDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/prod/plan/rsvdorder/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
