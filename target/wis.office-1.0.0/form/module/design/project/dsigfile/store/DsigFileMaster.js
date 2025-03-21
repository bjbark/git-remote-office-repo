Ext.define('module.design.project.dsigfile.store.DsigFileMaster', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigfile.model.DsigFileMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "design/dsigfile/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});