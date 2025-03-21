Ext.define('module.project.bonsamenu.model.BonsaMenuDetail',{ extend:'Axt.data.Model',
	fields: [
		{name: 'id',           	  type: 'string'   },
		{name: 'text',         	  type: 'string'   },
		{name: 'leaf',            type: 'boolean'   , serialize: Ext.util.Format.boolToInt } ,
		{name: 'expanded',        type: 'boolean'   , persist: false },

		{name: 'hq_id',           type: 'string'    , mapping : 'resource.hq_id'   	 },
		{name: 'menu_id',         type: 'string'    , mapping : 'resource.menu_id'   },
		{name: 'site_id',         type: 'string'    , mapping : 'resource.site_id'   },
		{name: 'active_yn',       type: 'boolean'   , mapping : 'resource.active_yn'   ,  convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },

		{name: 'hq_use_yn',       type: 'string'    , mapping : 'resource.hq_use_yn'   }, // 본사 사용
		{name: 'dm_use_yn',       type: 'string'    , mapping : 'resource.dm_use_yn'   }, // 직영 사용
		{name: 'branch_use_yn',   type: 'string'    , mapping : 'resource.branch_use_yn'   }, // 가맹 사용
		{name: 'usr_memo',        type: 'string'    , mapping : 'resource.usr_memo'   },


		{name: 'adpt_cmpy_name',  type: 'string'    , mapping : 'resource.adpt_cmpy_name'   },
		{name: 'cntr',            type: 'string'    , mapping : 'resource.cntr'   },
		{name: 'base',            type: 'string'    , mapping : 'resource.base'   },
		{name: 'ejac',            type: 'string'    , mapping : 'resource.ejac'   },
		{name: 'prjt',            type: 'string'    , mapping : 'resource.prjt'   },
		{name: 'gnrl',            type: 'string'    , mapping : 'resource.gnrl'   },
		{name: 'smli',            type: 'string'    , mapping : 'resource.smli'   },
		{name: 'clss',            type: 'string'    , mapping : 'resource.clss'   },
		{name: 'char_numb',       type: 'string'    , mapping : 'resource.char_numb'   },
		{name: 'pcmt',            type: 'string'    , mapping : 'resource.pcmt'   },
		{name: 'source_path',     type: 'string'    , mapping : 'resource.source_path'   },

		{name: 'row_sts',         type: 'string'    , mapping : 'resource.row_sts' , defaultValue:'0'  },
		{name: 'upt_id',          type: 'string'    , defaultValue: _global.login_pk },
		{name: 'crt_id',          type: 'string'    , defaultValue: _global.login_pk }
	]
});