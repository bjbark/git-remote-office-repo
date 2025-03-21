Ext.define('module.mtrl.po.purctrstwork.store.PurcTrstWorkDetail', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purctrstwork.model.PurcTrstWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/mtrl/po/purctrstwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
