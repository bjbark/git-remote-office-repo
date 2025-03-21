Ext.define('lookup.popup.project.model.ProjInfoPopup',{ extend:'Axt.data.Model',
	fields: 
	[
	 	{name: 'pjt_id',           	type: 'string'  },
	 	{name: 'proj_cd',           	type: 'string'  },
	    {name: 'pjt_nm',               type: 'string'  },
	    {name: 'proj_gb',               type: 'string'  , defaultValue: '1000' },
	    {name: 'proj_url',              type: 'string'  },
	    {name: 'user_memo',         	type: 'string'  },
	    {name: 'row_ord',         	type: 'string'  , defaultValue: '99' },
	    {name: 'row_sts',         	type: 'string'  , defaultValue: '0'  },
	    {name: 'upt_ui',         	type: 'string'  , defaultValue: ''   },  
	    {name: 'crt_ui',         	type: 'string'  , defaultValue: ''   },
	    {name: 'upt_id',         	type: 'string'  , defaultValue: _global.login_pk  },  
	    {name: 'crt_id',         	type: 'string'  , defaultValue: _global.login_pk  }
    ]
});
