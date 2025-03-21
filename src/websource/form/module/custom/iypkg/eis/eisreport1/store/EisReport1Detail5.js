Ext.define('module.custom.iypkg.eis.eisreport1.store.EisReport1Detail5', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.eis.eisreport1.model.EisReport1Detail5',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
//			read	: _global.location.http() + "/prod/order/workbookv2/get/detail2.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});