Ext.define('module.qc.insp.inspreport2.store.InspReport2Lister', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspreport2.model.InspReport2Lister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/qc/insp/inspreport2/get/lister.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
