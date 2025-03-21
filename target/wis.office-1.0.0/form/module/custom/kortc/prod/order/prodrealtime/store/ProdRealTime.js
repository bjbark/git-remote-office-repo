Ext.define('module.custom.kortc.prod.order.prodrealtime.store.ProdRealTime', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.prodrealtime.model.ProdRealTime',
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
