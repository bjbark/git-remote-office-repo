Ext.define('module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hjsys/mtrl/po/purcordr/get/detail2.do",
			update : _global.api_host_info + "/system/custom/hjsys/mtrl/po/purcordr/set/detail2.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
