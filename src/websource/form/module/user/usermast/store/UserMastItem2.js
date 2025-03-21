Ext.define('module.user.usermast.store.UserMastItem2', { extend:'Axt.data.Store',
	model    : 'module.user.usermast.model.UserMastItem2',
	pageSize : 20,
	proxy    : {
		api : {
			read : _global.location.http() + "/user/usermast/get/item2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST'	},
		extraParams		: { token : _global.token_id		}
	}
});