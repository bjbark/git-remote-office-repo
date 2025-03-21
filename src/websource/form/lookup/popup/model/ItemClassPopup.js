Ext.define('lookup.popup.model.ItemClassPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'prnt_idcd'			, type: 'string'}, /* pair */
		{name: 'clss_idcd'			, type: 'string'}, /* pair */
		{name: 'clss_code'			, type: 'string'},
		{name: 'shet_code'			, type: 'string'},
		{name: 'horz_leng'			, type: 'int'	},
		{name: 'vrtl_leng'			, type: 'int'	},
		{name: 'shet_name'			, type: 'string'},
		{name: 'clss_name'			, type: 'string'}, /* name */
		{name: 'fabc_idcd'			, type: 'string'}, /* name */
		{name: 'shet_idcd'			, type: 'string'}, /* name */
		{name: 'clss_desc'			, type: 'string'},  /* name */
		{name: 'item_issu_key'		, type: 'string'},  /* name */
		{name: 'code_leng'			, type: 'float'},  /* name */
		{name: 'lcls_idcd'			, type: 'string'},  /* name */
		{name: 'mcls_idcd'			, type: 'string'},  /* name */
		{name: 'scls_idcd'			, type: 'string'},  /* name */
		{name: 'acct_bacd'			, type: 'string'},  /* name */
	]
});
