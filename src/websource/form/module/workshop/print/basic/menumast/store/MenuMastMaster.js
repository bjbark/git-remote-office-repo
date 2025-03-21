Ext.define('module.workshop.print.basic.menumast.store.MenuMastMaster', { extend:'Axt.data.Store',
	model: 'module.workshop.print.basic.menumast.model.MenuMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/print/basic/menumast/get/search.do",
			update	: _global.location.http() + "/workshop/print/basic/menumast/set/delete.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
