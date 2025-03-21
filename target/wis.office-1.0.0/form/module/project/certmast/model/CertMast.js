Ext.define('module.project.certmast.model.CertMast',{ extend:'Axt.data.Model',

	fields: [

		{name: 'pos_ddns',			type: 'string'	},

		{name: 'hqof_idcd',			type: 'string'	},

		{name: 'cert_idcd',			type: 'string'	},
		{name: 'cert_code',			type: 'string'	},
		{name: 'cert_pswd',			type: 'string'	},
		{name: 'user_idcd',			type: 'string'	},
		{name: 'user_name',			type: 'string'	},
		{name: 'dept_name',			type: 'string'	},

		{name: 'cert_date',			type: 'string'	, persist: false , convert : Ext.util.Format.strToDate },
		{name: 'cert_cont',			type: 'int'		, persist: false , defaultValue :0 },
		{name: 'used_dt14',			type: 'string'	, persist: false , convert : Ext.util.Format.strToDateTime },

		{name: 'cert_name',			type: 'string'	},
		{name: 'cert_dvcd',			type: 'string'	, defaultValue : '0000' },
		{name: 'dsse_yorn',			type: 'string'	, defaultValue : '0' 	},

		{name: 'remk_text',			type: 'string'	},
		{name: 'hqof_stat',			type: 'string'	, defaultValue : '0000' },

		{name: 'cert_stat_dvcd',	type: 'string'	, defaultValue : '0000' },

		{name: 'user_memo',			type: 'string'	},
		{name: 'line_stat',			type: 'string'	, defaultValue : '0' } ,
		{name: 'updt_urif',			type: 'string'	, defaultValue: '0000001118'   },
		{name: 'crte_urif',			type: 'string'	, defaultValue: '0000001118'   },
		{name: 'updt_idcd',			type: 'string'	, defaultValue : _global.login_pk },
		{name: 'crte_idcd',			type: 'string'	, defaultValue : _global.login_pk }

	]
});
