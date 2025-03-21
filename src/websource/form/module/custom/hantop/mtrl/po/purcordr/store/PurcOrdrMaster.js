Ext.define('module.custom.hantop.mtrl.po.purcordr.store.PurcOrdrMaster', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrMaster',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hantop/mtrl/po/purcordr/get/search.do",
			update: _global.api_host_info + "/system/custom/hantop/mtrl/po/purcordr/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
