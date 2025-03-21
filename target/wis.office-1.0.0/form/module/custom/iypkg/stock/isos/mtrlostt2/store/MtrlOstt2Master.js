Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.store.MtrlOstt2Master', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.mtrlostt2.model.MtrlOstt2Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/custom/iypkg/stock/isos/mtrlostt2/get/search.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});