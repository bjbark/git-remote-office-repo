Ext.define('module.qc.insp.inspentry3.store.InspEntry3Invoice', { extend:'Axt.data.Store',
	model: 'module.qc.insp.inspentry3.model.InspEntry3Invoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/inspentry3/get/invoice.do",
			update: _global.api_host_info + "/system/mtrl/po/inspentry3/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
