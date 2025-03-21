Ext.define('module.project.hostinfo.model.HostInfo',{ extend:'Axt.data.Model',
    fields: [
		{	name: 'host_grp',		type: 'string', defaultValue : 'CDN'
		},{ name: 'host_id',		type: 'string'
		},{ name: 'host_cd',		type: 'string'
		},{ name: 'host_nm',		type: 'string'
		},{ name: 'host_gb',		type: 'string', defaultValue : '1'
		},{ name: 'host_os',		type: 'string', defaultValue : '1'
		},{ name: 'host_ip',		type: 'string'
		},{ name: 'dhcp_ip',		type: 'string'
		},{ name: 'srl_no',			type: 'string'
		},{ name: 'prod_model',		type: 'string'
		},{ name: 'pur_dt',			type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  /* 구매일자 */
		},{ name: 'pur_info',		type: 'string'
		},{ name: 'sw_memo',		type: 'string'
		},{ name: 'usr_id',			type: 'string'
		},{ name: 'emp_nm',			type: 'string'
		},{ name: 'usr_memo',		type: 'string'
		},{ name: 'row_sts',		type: 'string',  defaultValue : 0
		},{ name: 'host_count',		type: 'float'
		},{name: 'find_nm',             type: 'string'   ,
        	serialize : function (value, record) {
        		return record.get('host_cd') + record.get('host_nm') + record.get('host_gp');
			}
		}
    ]
});
