Ext.define('module.qc.insp.inspentry3.store.InspEntry3Master2', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry3.model.InspEntry3Master2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/qc/insp/inspentry3/get/search2.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
