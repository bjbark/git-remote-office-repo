Ext.define('lookup.popup.model.CstmClassPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'prnt_idcd'			, type: 'string'}, /* pair */
		{name: 'clss_idcd'			, type: 'string'}, /* pair */
		{name: 'clss_code'			, type: 'string'},
		{name: 'clss_name'			, type: 'string'}, /* name */
		{name: 'clss_desc'			, type: 'string'},  /* name */
		{name: 'code_issu_key'		, type: 'string'},  /* name */
		{name: 'code_leng'			, type: 'float'},  /* name */
		{name: 'lcls_idcd'			, type: 'string'},  /* name */
		{name: 'mcls_idcd'			, type: 'string'},  /* name */
		{name: 'scls_idcd'			, type: 'string'},  /* name */

	]
});
