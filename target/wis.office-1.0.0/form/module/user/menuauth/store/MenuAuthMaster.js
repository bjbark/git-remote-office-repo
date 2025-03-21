Ext.define('module.user.menuauth.store.MenuAuthMaster', {extend:'Axt.data.TreeStore',
	model     :'module.user.menuauth.model.MenuAuthMaster',
	autoLoad  : false,
	remoteSort: true,
	root      : { expanded: false },
	proxy     :{
		api :{
			read   : _global.api_host_info + "/system/user/menuauth/get/search.do"
		},
		actionMethods: { read: 'POST' },
		extraParams  :{ token : _global.token_id }
	}
});