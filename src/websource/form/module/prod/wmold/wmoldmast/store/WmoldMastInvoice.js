Ext.define('module.prod.wmold.wmoldmast.store.WmoldMastInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldmast.model.WmoldMastInvoice',
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
