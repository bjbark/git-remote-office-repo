Ext.define('module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerMaster', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.po.purcordr3.model.PurcOrdr3WorkerMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/mtrl/po/purcordr3/get/search2.do",
			update	: _global.location.http() + "/custom/iypkg/mtrl/po/purcordr3/set/record.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});