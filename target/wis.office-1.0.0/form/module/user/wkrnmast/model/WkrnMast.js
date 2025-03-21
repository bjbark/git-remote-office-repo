Ext.define('module.user.wkrnmast.model.WkrnMast',{ extend:'Axt.data.Model',
	fields: [
		{name: 'hqof_idcd'		, type: 'string'   , defaultValue : _global.hqof_idcd },
		{name: 'stor_grp'		, type: 'string'   , defaultValue : _global.stor_grp },
		{name: 'wkrn_idcd'		, type: 'string'  },
		{name: 'wkrn_code'		, type: 'string'  },
		{name: 'wkrn_name'		, type: 'string'  },
		{name: 'user_memo'		, type: 'string'  },
		{name: 'line_stat'		, type: 'string'   , defaultValue: '0' },
		{name: 'updt_urif'		, type: 'string'   , defaultValue : '0000000016'     },     /* 데이터 수정 UI */
		{name: 'crte_urif'		, type: 'string'   , defaultValue : '0000000016'     },     /* 데이터 생성 UI */
		{name: 'updt_idcd'		, type: 'string'   , defaultValue : _global.login_pk },     /* 데이터 수정 ID */
		{name: 'crte_idcd'		, type: 'string'   , defaultValue : _global.login_pk }      /* 데이터 생성 ID */

//		{name: 'line_stat',         	type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
	]
});
