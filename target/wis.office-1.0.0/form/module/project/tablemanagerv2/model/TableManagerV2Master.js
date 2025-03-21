Ext.define('module.project.tablemanagerv2.model.TableManagerV2Master',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'table_schema'	, type : 'string'
		},{	name: 'table_name'		, type : 'string'
		},{	name: 'table_rows'		, type : 'string'
		},{	name: 'data_length'		, type : 'string'
		},{	name: 'create_time'		, type : 'string'
		},{	name: 'update_time'		, type : 'string'
		},{	name: 'table_comment'	, type : 'string'
		}
	]
});
