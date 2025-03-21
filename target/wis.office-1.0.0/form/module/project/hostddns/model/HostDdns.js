Ext.define('module.project.hostddns.model.HostDdns',{ extend:'Axt.data.Model',
    fields: [
		{	name: 'site_yn',     			type: 'string'
		},{	name: 'host_id',       			type: 'string'
		},{	name: 'host_cd',   				type: 'string'
		},{	name: 'ddn_id',        			type: 'string'
		},{	name: 'ddn_cd',       			type: 'string'
		},{	name: 'ddn_nm',        			type: 'string'
		},{	name: 'ddn_gb',					type: 'string'
		},{	name: 'provider',      			type: 'string'
		},{	name: 'protocol',     			type: 'string'
		},{	name: 'host_conn_port',			type: 'string'	, defaultValue : 0
		},{	name: 'host_path',				type: 'string'
		},{	name: 'host_conn_acct',			type: 'string'
		},{	name: 'host_conn_pwd',			type: 'string'
		},{	name: 'host_ip',				type: 'string'
		},{	name: 'dhcp_ip',				type: 'string'
		},{	name: 'pooltime',      			type: 'float'	, defaultValue : 3600
		},{	name: 'maxcount',				type: 'float'	, defaultValue : 5
		},{	name: 'usr_memo',      			type: 'string'
		},{	name: 'row_sts',  				type: 'string'	, defaultValue : 0
		},{name: 'host_ip',             	type: 'string'
		},{name: 'dhcp_ip',            		type: 'string'
		}
    ]

});
