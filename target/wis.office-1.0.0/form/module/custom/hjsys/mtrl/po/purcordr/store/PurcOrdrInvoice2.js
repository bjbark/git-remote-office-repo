Ext.define('module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrInvoice2', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrInvoice2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/mtrl/po/purcordr/get/invoice3.do",
			update: _global.api_host_info + "/system/custom/hjsys/mtrl/po/purcordr/set/invoice2.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
