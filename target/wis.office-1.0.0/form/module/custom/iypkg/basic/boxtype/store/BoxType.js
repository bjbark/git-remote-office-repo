Ext.define('module.custom.iypkg.basic.boxtype.store.BoxType', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.basic.boxtype.model.BoxType',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/iypkg/basic/boxtype/get/search.do",
			update : _global.api_host_info + "/system/custom/iypkg/basic/boxtype/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
