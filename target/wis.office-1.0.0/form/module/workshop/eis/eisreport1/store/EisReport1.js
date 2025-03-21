Ext.define('module.workshop.eis.eisreport1.store.EisReport1', { extend:'Axt.data.Store',
	model: 'module.workshop.eis.eisreport1.model.EisReport1',
	autoLoad  : false,
	remoteSort: true,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/workshop/eis/eisreport1/get/search.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
