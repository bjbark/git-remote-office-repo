Ext.define('module.user.usermast.store.UserMastItem1', { extend:'Axt.data.Store',
	model    : 'module.user.usermast.model.UserMastItem1',
	pageSize : 20,
	proxy    : {
		api : {
			read	: _global.location.http() + "/user/usermast/get/item1.do",
			update : _global.location.http() + "/user/usermast/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST'	},
		extraParams		: { token : _global.token_id		}
	}
});