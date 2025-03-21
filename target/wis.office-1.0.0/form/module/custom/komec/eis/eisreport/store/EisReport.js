Ext.define('module.custom.komec.eis.eisreport.store.EisReport', { extend:'Axt.data.Store',

	model :'module.custom.komec.eis.eisreport.model.EisReport',
	autoLoad: true,
	pageSize: 4000,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/komec/eis/eisreport/get/search.do",
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});