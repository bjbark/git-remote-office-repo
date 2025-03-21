Ext.define('module.user.menuauth.model.MenuAuthDetail',{extend:'Axt.data.Model',
	fields : [
		{name: 'user_idcd'		, type: 'string'  },
		{name: 'user_name'		, type: 'string'  , persist : false },
		{name: 'dept_name'		, type: 'string'  , persist : false },
		{name: 'menu_id'		, type: 'string'  },
		{name: 'menu_nm'		, type: 'string'  , persist : false },
		{name: 'modl_nm'		, type: 'string'  },
		{name: 'last_pgm_yn'	, type: 'string'  , persist : false },

		{name: 'hqof_idcd'		, type: 'string'  , defaultValue : _global.hq_id },
		{name: 'lgin_idcd'		, type: 'string'  },

		{name: 'active_yn'		, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'inpt_use_yn'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'upt_use_yn'		, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'del_use_yn'		, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'prt_use_yn'		, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'expt_use_yn'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },

		{name: 'active_yn_def'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'insert_yn_def'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'modify_yn_def'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'delete_yn_def'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'report_yn_def'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'export_yn_def'	, type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },

		{name: 'updt_urif'		, type: 'string' , defaultValue : '0000000017' },     /* 데이터 수정 UI */
		{name: 'crte_urif'		, type: 'string' , defaultValue : '0000000017' },     /* 데이터 생성 UI */
		{name: 'updt_idcd'		, type: 'string' , defaultValue : _global.login_pk }, /* 데이터 수정 ID */
		{name: 'crte_idcd'		, type: 'string' , defaultValue : _global.login_pk }  /* 데이터 생성 ID */
	]
});


