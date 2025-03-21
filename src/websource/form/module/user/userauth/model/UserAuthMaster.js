Ext.define('module.user.userauth.model.UserAuthMaster',{ extend:'Axt.data.Model',
	fields :[
		{name: 'user_name'		, type: 'string'  },
		{name: 'user_idcd'		, type: 'string'  },
		{name: 'dept_name'		, type: 'string'  },
		{name: 'lgin_idcd'		, type: 'string'  },
		{name: 'auth_dvcd'		, type: 'string'   , defaultValue : '0' }
//		,{name: 'user_memo'		, type: 'string'  }
//		,{name: 'row_sts'		, type: 'boolean'  , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
	]
});