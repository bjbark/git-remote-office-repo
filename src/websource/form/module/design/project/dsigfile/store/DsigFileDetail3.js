Ext.define('module.design.project.dsigfile.store.DsigFileDetail3', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigfile.model.DsigFileDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigfile/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});