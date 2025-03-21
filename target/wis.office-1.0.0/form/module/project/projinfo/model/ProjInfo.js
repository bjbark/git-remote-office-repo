Ext.define('module.project.projinfo.model.ProjInfo',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'pjt_id',			type: 'string'  },
		{name: 'pjt_cd',			type: 'string'  },
		{name: 'pjt_nm',			type: 'string'  },
		{name: 'pjt_gb',			type: 'string'  , defaultValue: '1000' },
		{name: 'pjt_url',			type: 'string'  },

		{name: 'usr_memo',			type: 'string'  },
		{name: 'row_ord',			type: 'string'  , defaultValue: '99' },
		{name: 'row_sts',			type: 'string'  , defaultValue: '0'  },

		{name: 'upt_ui',			type: 'string'  },
		{name: 'crt_ui',			type: 'string'  },
		{name: 'upr_id',			type: 'string'  , defaultValue: _global.login_pk  },
		{name: 'crt_id',			type: 'string'  , defaultValue: _global.login_pk  }
	]
});
