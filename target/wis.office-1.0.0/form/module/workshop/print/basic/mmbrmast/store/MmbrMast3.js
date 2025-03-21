Ext.define('module.workshop.print.basic.mmbrmast.store.MmbrMast3', { extend:'Axt.data.Store',
	model	: 'module.workshop.print.basic.mmbrmast.model.MmbrMast3',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/workshop/print/basic/mmbrmast/get/search3.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});