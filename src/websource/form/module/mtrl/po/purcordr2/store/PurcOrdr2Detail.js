Ext.define('module.mtrl.po.purcordr2.store.PurcOrdr2Detail', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purcordr2.model.PurcOrdr2Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/mtrl/po/purcordr2/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
