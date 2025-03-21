Ext.define('module.prod.wmold.wmoldlist.store.WmoldListInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.wmold.wmoldlist.model.WmoldListInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.location.http() + "/prod/mold/moldlist/get/invoice.do",
			update: _global.location.http() + "/prod/mold/moldlist/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
