Ext.define('module.mtrl.po.purcstokwork.store.PurcStokWorkLister', { extend:'Axt.data.Store',
	model	: 'module.mtrl.po.purcstokwork.model.PurcStokWorkLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy	: {
			api	: {
				read  : _global.api_host_info + "/system/mtrl/po/purcstokwork/get/lister.do",
				update : _global.location.http() + "/mtrl/po/purcstokwork/set/record.do"

			},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});