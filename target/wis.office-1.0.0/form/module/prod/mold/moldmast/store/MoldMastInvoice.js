Ext.define('module.prod.mold.moldmast.store.MoldMastInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.mold.moldmast.model.MoldMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.location.http() + "/prod/mold/moldmast/get/invoice.do",
			update: _global.location.http() + "/prod/mold/moldmast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
