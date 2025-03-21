Ext.define('module.workshop.print.basic.menumast.store.MenuMastDetail', { extend:'Axt.data.Store',
	model: 'module.workshop.print.basic.menumast.model.MenuMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/print/basic/menumast/get/detail.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
