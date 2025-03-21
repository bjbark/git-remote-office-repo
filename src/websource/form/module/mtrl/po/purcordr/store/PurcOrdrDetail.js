Ext.define('module.mtrl.po.purcordr.store.PurcOrdrDetail', { extend:'Axt.data.Store',
	model: 'module.mtrl.po.purcordr.model.PurcOrdrDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/mtrl/po/purcordr/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
