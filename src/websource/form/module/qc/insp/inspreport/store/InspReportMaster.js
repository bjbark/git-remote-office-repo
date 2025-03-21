Ext.define('module.qc.insp.inspreport.store.InspReportMaster', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspreport.model.InspReportMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/qc/insp/inspreport/get/master.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
