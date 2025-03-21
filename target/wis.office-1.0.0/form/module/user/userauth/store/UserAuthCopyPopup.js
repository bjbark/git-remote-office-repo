Ext.define('module.user.userauth.store.UserAuthCopyPopup', { extend:'Axt.data.Store',

	model   :'module.user.userauth.model.UserAuthCopyPopup',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy   :{
		api :{
			read   : _global.api_host_info + "/system/user/userauth/get/popupsearch.do",
			update : _global.api_host_info + "/system/user/userauth/set/authcopy.do"
		},
		actionMethods : { read  : 'POST' , update : 'POST'	},
		extraParams   : { token : _global.token_id			}
	}
});