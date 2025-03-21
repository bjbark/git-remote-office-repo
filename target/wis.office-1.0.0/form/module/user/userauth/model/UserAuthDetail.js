Ext.define('module.user.userauth.model.UserAuthDetail',{ extend:'Axt.data.Model',
	fields :[
		{name: 'id'				, type: 'string'  },
		{name: 'text'			, type: 'string'  },
		{name: 'leaf'			, type: 'boolean'  , serialize: Ext.util.Format.boolToInt } ,
		{name: 'expanded'		, type: 'boolean'  , persist: false },

		{name: 'active_yn'		, type: 'string'   , defaultValue : _global.active_yn },  /* 매출계정구분  */
		{name: 'emp_id'			, type: 'string'   , mapping : 'resource.emp_id' },
		{name: 'menu_id'		, type: 'string'   , mapping : 'resource.menu_id' },
		{name: 'menu_nm'		, type: 'string'   , mapping : 'resource.menu_nm' },
		{name: 'modl_nm'		, type: 'string'  },

		{name: 'active_yn'		, type: 'boolean'  , mapping : 'resource.active_yn'		, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'inpt_use_yn'	, type: 'boolean'  , mapping : 'resource.inpt_use_yn'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'upt_use_yn'		, type: 'boolean'  , mapping : 'resource.upt_use_yn'		, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'del_use_yn'		, type: 'boolean'  , mapping : 'resource.del_use_yn'		, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'prt_use_yn'		, type: 'boolean'  , mapping : 'resource.prt_use_yn'		, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'expt_use_yn'	, type: 'boolean'  , mapping : 'resource.expt_use_yn'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },

		{name: 'insert_yn_def'	, type: 'boolean'  , mapping : 'resource.insert_yn_def'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'modify_yn_def'	, type: 'boolean'  , mapping : 'resource.modify_yn_def'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'delete_yn_def'	, type: 'boolean'  , mapping : 'resource.delete_yn_def'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'report_yn_def'	, type: 'boolean'  , mapping : 'resource.report_yn_def'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
		{name: 'export_yn_def'	, type: 'boolean'  , mapping : 'resource.export_yn_def'	, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },

		{name: 'hq_id'			, type: 'string'   , defaultValue : _global.hq_id },
		{name: 'stor_grp'		, type: 'string'   , defaultValue : _global.stor_grp },
		{name: 'stor_gb'		, type: 'string'   , defaultValue : _global.stor_gb },

		{name: 'auth_gb'		, type: 'string'   , defaultValue : '0' },

		{name: 'hq_use_yn'		, type: 'string'  },
		{name: 'dm_use_yn'		, type: 'string'  },
		{name: 'branch_use_yn'	, type: 'string'  },

		{name: 'row_sts'		, type: 'string'   , mapping : 'resource.row_sts' , defaultValue:'0'  },

		{name: 'upt_ui'			, type: 'string'   , defaultValue : '0000000015' },     /* 데이터 수정 UI */
		{name: 'crt_ui'			, type: 'string'   , defaultValue : '0000000015' },     /* 데이터 생성 UI */
		{name: 'upt_id'			, type: 'string'   , defaultValue : _global.login_pk }, /* 데이터 수정 ID */
		{name: 'crt_id'			, type: 'string'   , defaultValue : _global.login_pk }  /* 데이터 생성 ID */
	]
});