Ext.define('module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrFile',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/upload/get/filesearch.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
