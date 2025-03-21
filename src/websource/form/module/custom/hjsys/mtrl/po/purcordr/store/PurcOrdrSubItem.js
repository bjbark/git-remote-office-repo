Ext.define('module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrSubItem', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrSubItem',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/hjsys/mtrl/po/purcordr/get/subItem.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
