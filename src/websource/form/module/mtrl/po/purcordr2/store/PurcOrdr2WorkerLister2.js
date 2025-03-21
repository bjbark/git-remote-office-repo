Ext.define('module.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister2', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/purcordr2/get/search2.do",
//			update: _global.api_host_info + "/system/mtrl/po/purcordr2/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
