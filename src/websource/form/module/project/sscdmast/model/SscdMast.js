Ext.define('module.project.sscdmast.model.SscdMast',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'sscd_idcd'			, type : 'string'
		},{ name: 'lang_dvcd'			, type : 'string', defaultvalue: 'KOR'
		},{ name: 'site_idcd'			, type : 'string'
		},{ name: 'sscd_code'			, type : 'string'
		},{ name: 'sscd_name'			, type : 'string'
		},{ name: 'sscd_dvcd'			, type : 'string'
		},{ name: 'dflt_valu'			, type : 'string'
		},{ name: 'lkup_valu'			, type : 'string'
		},{ name: 'sbsc_valu'			, type : 'string'
		},{ name: 'user_memo'			, type : 'string'
		},{ name: 'sysm_memo'			, type : 'string'
		},{ name: 'prnt_idcd'			, type : 'string'
		},{ name: 'line_levl'			, type : 'string'
		},{ name: 'line_ordr'			, type : 'string'
		},{ name: 'line_stat'			, type : 'string',  defaultvalue: '0'
		},{ name: 'line_clos'			, type : 'string'
		},{ name: 'find_name'			, type : 'string'
		},{ name: 'updt_ipad'			, type : 'string'
		},{ name: 'updt_dttm'			, type : 'string'
		},{ name: 'updt_idcd'			, type : 'string'
		},{ name: 'updt_urif'			, type : 'string'
		},{ name: 'crte_ipad'			, type : 'string'
		},{ name: 'crte_dttm'			, type : 'string'
		},{ name: 'crte_idcd'			, type : 'string'
		},{ name: 'crte_urif'			, type : 'string'
		},{ name: 'updt_user_name'		, type : 'string'
		},{ name: 'crte_user_name'		, type : 'string'
		}
	]
});