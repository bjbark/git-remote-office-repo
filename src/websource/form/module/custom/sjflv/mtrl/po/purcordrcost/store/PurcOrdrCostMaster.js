Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.store.PurcOrdrCostMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.po.purcordrcost.model.PurcOrdrCostMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/mtrl/po/purcordrcost/get/search.do",
			update : _global.api_host_info + "/system/custom/sjflv/mtrl/po/purcordrcost/set/record.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
