Ext.define('module.custom.kortc.prod.rsvdorder.store.RsvdOrderDetail', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.rsvdorder.model.RsvdOrderDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/prod/plan/rsvdorder/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
