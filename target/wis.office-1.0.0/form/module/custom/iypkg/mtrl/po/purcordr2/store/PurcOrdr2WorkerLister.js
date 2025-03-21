Ext.define('module.custom.iypkg.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/mtrl/po/purcordr2/get/search2.do",
			update : _global.location.http() + "/custom/iypkg/mtrl/po/purcordr2/set/record.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});