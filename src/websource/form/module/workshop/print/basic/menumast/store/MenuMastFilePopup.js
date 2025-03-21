Ext.define('module.workshop.print.basic.menumast.store.MenuMastFilePopup', { extend:'Axt.data.Store',
	model: 'module.workshop.print.basic.menumast.model.MenuMastFilePopup',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/upload/get/filesearch.do",
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
