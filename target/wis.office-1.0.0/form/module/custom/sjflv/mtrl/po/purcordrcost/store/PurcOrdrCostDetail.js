Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.store.PurcOrdrCostDetail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.po.purcordrcost.model.PurcOrdrCostDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/mtrl/po/purcordrcost/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
