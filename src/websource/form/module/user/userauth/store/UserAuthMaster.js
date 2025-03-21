Ext.define('module.user.userauth.store.UserAuthMaster', {extend:'Axt.data.Store',
	model      :'module.user.userauth.model.UserAuthMaster',
	autoLoad   : false,
	pageSize   : Const.SELECT.rows, //remoteSort:true,
	remoteSort : true,
	proxy      :{
		api:{
			read  : _global.api_host_info + "/system/user/userauth/get/search.do"
//			,update : _global.api_host_info+ "/system/user/deptinfo/set/master.do"
		},
		actionMethods: { read: 'POST'				}, //  ,update : 'POST'
		extraParams  : { token : _global.token_id	}
	}
});
