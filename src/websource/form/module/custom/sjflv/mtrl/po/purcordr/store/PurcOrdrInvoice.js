Ext.define('module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/po/purcordr/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/po/purcordr/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
