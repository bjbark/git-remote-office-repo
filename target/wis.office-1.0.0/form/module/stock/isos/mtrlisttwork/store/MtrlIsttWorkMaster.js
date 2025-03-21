Ext.define('module.stock.isos.mtrlisttwork.store.MtrlIsttWorkMaster', { extend:'Axt.data.Store',
	model: 'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.location.http() + "/stock/isos/mtrlisttwork/get/master.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});