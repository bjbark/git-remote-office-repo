Ext.define('module.project.daemoninfo.model.DaemonInfo',{ extend:'Axt.data.Model',
    fields: 
    [
 		{name: 'host_id',        	    type: 'string'  },
 		{name: 'host_cd',        	    type: 'string'  },
     	{name: 'daemon_id',            	type: 'string'  },
        {name: 'daemon_nm',           	type: 'string'  },
        {name: 'user_memo',         	type: 'string'  },
        {name: 'row_state',         	type: 'string'   , defaultValue : 0 } ,  //, defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
        {name: 'update_id',             type: 'string'   , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
        {name: 'create_id',             type: 'string'   , defaultValue : _global.login_pk } /* 데이터 생성자 명 */
    ]
});
