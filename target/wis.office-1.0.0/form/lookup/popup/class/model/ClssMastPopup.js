Ext.define('lookup.popup.class.model.ClssMastPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'hq_id'				, type: 'string'  },
		{name: 'stor_grp'			, type: 'string'  },
		//
		{name: 'clss_idcd'			, type: 'string'  }, /* pair */
		{name: 'clss_code'			, type: 'string'  }, /* pair */
		{name: 'clss_name'			, type: 'string'  },
		{name: 'clss_code_numb'		, type: 'string'  }, /* name */
		{name: 'clss_desc'			, type: 'string'  },  /* name */
		{name: 'code_issu_key'		, type: 'string'  },  /* name */
		{name: 'code_leng'			, type: 'string'  },  /* name */
		{name: 'line_levl'			, type: 'string'  },  /* name */
		{name: 'user_memo'			, type: 'string'  },  /* name */
		{name: 'line_stat'			, type: 'string'  }  /* name */
	]
});
