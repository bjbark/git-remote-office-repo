Ext.define('module.user.menuauth.model.MenuAuthMaster',{ extend:'Axt.data.Model',
	fields:[
		{name: 'id',			type: 'string'  },
		{name: 'text',			type: 'string'  },
		{name: 'leaf',			type: 'boolean' , serialize: Ext.util.Format.boolToInt } ,
		{name: 'expanded',		type: 'boolean' , persist: false },

		{name: 'stor_gb',		type: 'string'  , defaultValue : _global.stor_gb },
//		{name: 'active_yn',		type: 'string'  , defaultValue : _global.active_yn },  /* 매출계정구분  */
		{name: 'menu_id',		type: 'string'  , mapping : 'resource.menu_id' },
		{name: 'menu_nm',		type: 'string'  , mapping : 'resource.menu_nm' },
		{name: 'last_pgm_yn',	type: 'string'  , persist : false },
		{name: 'modl_nm',		type: 'string'  },

		{name: 'site_id',		type: 'string'  },
		{name: 'auth_gb',		type: 'string'   , defaultValue : '0' }
	]
});

