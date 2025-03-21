Ext.define('module.project.codeinfo.model.CodeInfo',{ extend:'Axt.data.Model',
	fields:
	[
	 	{name: 'site_id',              type: 'string'  },
	 	{name: 'code_id',              type: 'string'  },
	 	{name: 'code_cd',              type: 'string'  },
	 	{name: 'lang_gbcd',            type: 'string'  , defaultValue: 'KOR' },
	 	{name: 'code_nm',              type: 'string'  },
	 	{name: 'code_gb',              type: 'string'  },
	 	{name: 'deflt_val',            type: 'string'  },
	 	{name: 'lookup_val',           type: 'string'  },
	 	{name: 'itm_val',              type: 'string'  },
	 	{name: 'usr_memo',             type: 'string'  },
	 	{name: 'row_sts',              type: 'string' , defaultValue: '0' }
	 	//{name: 'row_sts',           type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
    ]
});
