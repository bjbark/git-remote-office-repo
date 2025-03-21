Ext.define('module.workshop.print.basic.menumast.store.MenuMastInvoice', { extend:'Axt.data.Store',
	model: 'module.workshop.print.basic.menumast.model.MenuMastInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/print/basic/menumast/get/invoice.do",
			update	: _global.location.http() + "/workshop/print/basic/menumast/set/invoice.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
