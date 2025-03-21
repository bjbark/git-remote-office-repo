Ext.define('module.mtrl.po.purcordr2.store.PurcOrdr2Invoice', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purcordr2.model.PurcOrdr2Invoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/mtrl/po/purcordr2/get/invoice.do",
			update: _global.api_host_info + "/system/mtrl/po/purcordr2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
