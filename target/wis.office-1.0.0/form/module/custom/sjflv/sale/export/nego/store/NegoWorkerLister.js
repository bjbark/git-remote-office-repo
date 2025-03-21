Ext.define('module.custom.sjflv.sale.export.nego.store.NegoWorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.nego.model.NegoWorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/sjflv/sale/export/nego/get/workerlister.do",
			update: _global.api_host_info + "/system/.custom.sjflv.sale.export.nego/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
