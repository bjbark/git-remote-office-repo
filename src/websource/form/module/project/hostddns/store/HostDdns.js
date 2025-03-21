Ext.define('module.project.hostddns.store.HostDdns', {  extend:'Axt.data.Store',
	model: 'module.project.hostddns.model.HostDdns',
	autoLoad: false,
	pageSize: 20,
	proxy:{
		api:{
			read   : _global.location.http()  + "/project/hostddns/get/search.do"
		   ,update : _global.location.http()  + "/project/hostddns/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});