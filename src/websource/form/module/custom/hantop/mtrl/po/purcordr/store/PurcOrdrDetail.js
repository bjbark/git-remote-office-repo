Ext.define('module.custom.hantop.mtrl.po.purcordr.store.PurcOrdrDetail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hantop/mtrl/po/purcordr/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
