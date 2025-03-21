Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.store.DailyPurcListLister4', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.dailypurclist.model.DailyPurcList4',
	pageSize	: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/mtrl/purc/dailypurclist/get/search4.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
