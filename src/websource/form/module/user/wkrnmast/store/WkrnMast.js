Ext.define('module.user.wkrnmast.store.WkrnMast', { extend:'Axt.data.Store' ,
	model     :'module.user.wkrnmast.model.WkrnMast',
	autoLoad  : false,
	remoteSort: true,
	pageSize  : Const.SELECT.rows,
	proxy     :{
		api:{
			read   : _global.api_host_info + "/system/user/wkrnmast/get/search.do",
			update : _global.api_host_info + "/system/user/wkrnmast/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST'	},
		extraParams  : { token : _global.token_id		}
	}
});