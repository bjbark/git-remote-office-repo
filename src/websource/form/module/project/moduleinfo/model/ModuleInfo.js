Ext.define('module.project.moduleinfo.model.ModuleInfo', {  extend:'Axt.data.Model',
	fields: [
		{	name: 'id'				, type: 'string'
		},{ name: 'text'			, type: 'string'  , mapping : 'resource.menu_nm'
		},{ name: 'menu_id'			, type: 'string'
		},{ name: 'menu_nm_englh'	, type: 'string'
		},{ name: 'menu_nm_chi'		, type: 'string'
		},{ name: 'menu_nm_jpns'	, type: 'string'
		},{ name: 'menu_nm_etc'		, type: 'string'
		},{ name: 'leaf'			, type: 'boolean' , serialize: Ext.util.Format.boolToInt
		},{ name: 'expanded'		, type: 'boolean' , persist: false
		},{ name: 'pjt_id'			, type: 'string'  , defaultValue : _global.solution
		},{ name: 'menu_gb'			, type: 'string'  , mapping : 'resource.menu_gb'        , defaultValue: '0'
		},{ name: 'last_modl_yn'	, type: 'string'  , mapping : 'resource.last_modl_yn'   , defaultValue: true , convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt
		},{ name: 'modl_id'			, type: 'string'  , mapping : 'resource.modl_id'
		},{ name: 'modl_nm'			, type: 'string'  , mapping : 'resource.modl_nm'
		},{ name: 'tree_expn_yn'	, type: 'string'  , mapping : 'resource.tree_expn_yn'   , defaultValue: true , convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt
		},{	name: 'admin_use'		, type: 'string'  , mapping : 'resource.admin_use'      , defaultValue: 'N'
		},{	name: 'inq_use_yn'		, type: 'string'  , mapping : 'resource.select_yn'      , defaultValue: '1'
		},{	name: 'inpt_use_yn'		, type: 'string'  , mapping : 'resource.inpt_use_yn'    , defaultValue: '1'
		},{	name: 'upt_use_yn'		, type: 'string'  , mapping : 'resource.upt_use_yn'     , defaultValue: '1'
		},{	name: 'del_use_yn'		, type: 'string'  , mapping : 'resource.del_use_yn'     , defaultValue: '1'
		},{	name: 'prt_use_yn'		, type: 'string'  , mapping : 'resource.prt_use_yn'     , defaultValue: '1'
		},{	name: 'expt_use_yn'		, type: 'string'  , mapping : 'resource.expt_use_yn'    , defaultValue: '1'
		},{	name: 'auth_gb'			, type: 'string'  , mapping : 'resource.auth_gb'        , defaultValue: '1'
		},{	name: 'hq_use_yn'		, type: 'string'  , mapping : 'resource.hq_use_yn'		, defaultValue: '0'
		},{	name: 'dm_use_yn'		, type: 'string'  , mapping : 'resource.dm_use_yn'		, defaultValue: '0'
		},{	name: 'branch_use_yn'	, type: 'string'  , mapping : 'resource.branch_use_yn'	, defaultValue: '0'
		},{	name: 'prnt_id'			, type: 'string'  , mapping : 'resource.prnt_id'
		},{	name: 'row_ord'			, type: 'integer' , mapping : 'resource.row_ord'		, defaultValue:  1
		},{	name: 'row_lvl'			, type: 'integer' , mapping : 'resource.row_lvl'		, defaultValue:  1
		},{	name: 'row_sts'			, type: 'string'  , mapping : 'resource.row_sts'		, defaultValue:  '0'
		},{	name: 'dev_usr_per'		, type: 'string'  , mapping : 'resource.dev_usr_per'
		},{	name: 'perf_rt'			, type: 'string'  , mapping : 'resource.perf_rt'		, defaultValue: 0
		},{	name: 'old_ver_menu'	, type: 'string'  , mapping : 'resource.old_ver_menu'
		},{	name: 'old_ver_menu_nm'	, type: 'string'  , mapping : 'resource.old_ver_menu_nm'
		},{	name: 'usr_memo'		, type: 'string'  , mapping : 'resource.usr_memo'
		},{name: 'adpt_cmpy_name'	, type: 'string'  , mapping : 'resource.adpt_cmpy_name'
		},{name: 'cntr'				, type: 'string'  , mapping : 'resource.cntr'
		},{name: 'base'				, type: 'string'  , mapping : 'resource.base'
		},{name: 'ejac'				, type: 'string'  , mapping : 'resource.ejac'
		},{name: 'prjt'				, type: 'string'  , mapping : 'resource.prjt'
		},{name: 'gnrl'				, type: 'string'  , mapping : 'resource.gnrl'
		},{name: 'smli'				, type: 'string'  , mapping : 'resource.smli'
		},{name: 'clss'				, type: 'string'  , mapping : 'resource.clss'
		},{name: 'char_numb'		, type: 'string'  , mapping : 'resource.char_numb'
		},{name: 'pcmt'				, type: 'string'  , mapping : 'resource.pcmt'
		}
	]
});

//, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt
