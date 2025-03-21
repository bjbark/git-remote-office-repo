Ext.define('module.qc.basic.insptypeitem.store.InspTypeItemDetail', { extend:'Axt.data.Store',
	model: 'module.qc.basic.insptypeitem.model.InspTypeItemDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/qc/basic/insptypeitem/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
