Ext.define('module.qc.basic.insptypeitem.store.InspTypeItemMaster', { extend:'Axt.data.Store',
	model: 'module.qc.basic.insptypeitem.model.InspTypeItemMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/qc/basic/insptypeitem/get/search.do",
			update: _global.api_host_info + "/system/qc/basic/insptypeitem/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
