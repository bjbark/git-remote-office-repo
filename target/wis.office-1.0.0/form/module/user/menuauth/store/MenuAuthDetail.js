Ext.define('module.user.menuauth.store.MenuAuthDetail', {extend:'Axt.data.Store',
	model     :'module.user.menuauth.model.MenuAuthDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize  : Const.SELECT.rows,
	proxy     :{
		api:{
			read   : _global.api_host_info + "/system/user/menuauth/get/detail.do",
			update : _global.api_host_info + "/system/user/menuauth/set/detail.do"
		},
		actionMethods: { read: 'POST', update : 'POST'},
		extraParams:{ token : _global.token_id }
	}
});