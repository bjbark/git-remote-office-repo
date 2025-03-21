Ext.define('module.basic.csscdmast.store.CSscdMast', {extend:'Axt.data.Store',
	model: 'module.basic.csscdmast.model.CSscdMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/basic/sscdmast/get/search.do",
			update : _global.location.http() + "/basic/sscdmast/set/master.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});