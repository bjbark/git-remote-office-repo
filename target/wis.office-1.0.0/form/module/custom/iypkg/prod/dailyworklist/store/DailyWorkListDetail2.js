Ext.define('module.custom.iypkg.prod.dailyworklist.store.DailyWorkListDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.dailyworklist.model.DailyWorkListDetail2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv2/get/detail2.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});