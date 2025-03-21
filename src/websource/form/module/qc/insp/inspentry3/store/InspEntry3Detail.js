Ext.define('module.qc.insp.inspentry3.store.InspEntry3Detail', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry3.model.InspEntry3Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/qc/insp/inspentry3/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
