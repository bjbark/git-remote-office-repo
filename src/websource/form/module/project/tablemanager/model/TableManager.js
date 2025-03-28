Ext.define('module.project.tablemanager.model.TableManager',{ extend:'Axt.data.Model',
	fields: [
		{   name: 'tabl_idcd'		, type: 'string'
		},{ name: 'fied_seqn'		, type: 'int'
		},{ name: 'tabl_name'		, type: 'string'
		},{ name: 'engl_fied_name'	, type: 'string'
		},{ name: 'fied_name'		, type: 'string'
		},{ name: 'data_type'		, type: 'string'
		},{ name: 'data_leng'		, type: 'string'
		},{ name: 'key_dvcd'		, type: 'string'
		},{ name: 'null_dvcd'		, type: 'string'
		},{ name: 'dflt_valu'		, type: 'string'
		},{	name: 'word_1'			, type: 'string'
		},{	name: 'engl_word_1'		, type: 'string'
		},{	name: 'word_2'			, type: 'string'
		},{	name: 'engl_word_2'		, type: 'string'
		},{	name: 'word_3'			, type: 'string'
		},{	name: 'engl_word_3'		, type: 'string'
		},{	name: 'word_4'			, type: 'string'
		},{	name: 'engl_word_4'		, type: 'string'
		},{	name: 'word_5'			, type: 'string'
		},{	name: 'engl_word_5'		, type: 'string'
		},{	name: 'word_6'			, type: 'string'
		},{	name: 'engl_word_6'		, type: 'string'
		},{ name: 'oldd_idcd'		, type: 'string'
		},{ name: 'oldd_name'		, type: 'string'
		},{ name: 'code_desc'		, type: 'string'
		},{ name: 'disp_fied_name'	, type: 'string'
		},{ name: 'prjt_dvsn'		, type: 'string', defaultValue: 'MAIN'
		}
	]
});
