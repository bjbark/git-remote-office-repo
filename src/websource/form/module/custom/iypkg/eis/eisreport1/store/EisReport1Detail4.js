Ext.define('module.custom.iypkg.eis.eisreport1.store.EisReport1Detail4', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.eis.eisreport1.model.EisReport1Detail4',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/eis/eisreport1/get/detail2.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});