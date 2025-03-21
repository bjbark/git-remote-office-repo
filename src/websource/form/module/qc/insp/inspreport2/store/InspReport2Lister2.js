Ext.define('module.qc.insp.inspreport2.store.InspReport2Lister2', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspreport2.model.InspReport2Lister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/qc/insp/inspreport2/get/lister2.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
