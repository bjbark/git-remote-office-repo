Ext.define('module.user.userauth.model.UserAuthCopyPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'hqof_idcd'		, type: 'string'  , defaultValue : _global.hq_id }, /* 본사 ID */
		{name: 'user_idcd'		, type: 'string'  },
		{name: 'new_user_idcd'	, type: 'string'  },
		{name: 'user_name'		, type: 'string'  },
		{name: 'user_code'		, type: 'string'  },
		{name: 'dept_idcd'		, type: 'string'  },
		{name: 'wkrn_idcd'		, type: 'string'  },

		{name: 'dept_name'		, type: 'string'  },
		{name: 'wkrn_name'		, type: 'string'  },

		{name: 'auth_dvcd'		, type: 'string'  },
		{name: 'lgin_idcd'		, type: 'string'  },
		{name: 'lgin_pswd'		, type: 'string'  },
		{name: 'join_date'		, type: 'string'  }
	]
});
