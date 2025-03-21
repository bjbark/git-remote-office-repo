Ext.define('module.custom.kortc.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister3', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/mtrl/po/purcordr2/get/search3.do",
			update: _global.api_host_info + "/system/custom/kortc/mtrl/po/purcordr2/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
