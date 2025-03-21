Ext.define('module.qc.insp.inspentry6.store.InspEntry6Master', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry6.model.InspEntry6Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/qc/insp/inspentry6/get/master.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
