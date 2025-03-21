Ext.define('module.qc.insp.inspentry3.store.InspEntry3Master', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry3.model.InspEntry3Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/qc/insp/inspentry3/get/search.do",
			update: _global.api_host_info + "/system/qc/insp/inspentry3/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
