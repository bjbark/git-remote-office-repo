Ext.define('module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerDetail', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.po.purcordr3.model.PurcOrdr3WorkerDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/mtrl/po/purcordr3/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});