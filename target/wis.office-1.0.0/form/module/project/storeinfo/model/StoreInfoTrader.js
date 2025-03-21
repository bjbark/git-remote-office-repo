Ext.define('module.project.storeinfo.model.StoreInfoTrader',{ extend:'Axt.data.Model',
    fields: 
    [
     	{name: 'ctrl_id',          type: 'string'  },
     	{name: 'hq_id',          type: 'string'  },
     	{name: 'stor_id',          type: 'string'  },
     	{name: 'stor_no',          type: 'string'  },
     	
     	{name: 'trade_id',          type: 'string'  },
     	{name: 'trade_nm',          type: 'string'  },
        {name: 'trade_cd',          type: 'string'  },
        {name: 'trade_pwd',          type: 'string'  },
        {name: 'trade_cg',          type: 'string'  },
        {name: 'trade_sts',          type: 'string'   , defaultValue : '0000' },
        
        {name: 'usr_memo',         type: 'string'   },
        {name: 'row_sts',         type: 'string'   , defaultValue : 0 } , // defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
	    {name: 'upt_ui',         type: 'string'   , defaultValue: '0000000709'   },  
	    {name: 'crt_ui',         type: 'string'   , defaultValue: '0000000709'   },
        {name: 'upt_id',         type: 'string'   , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
        {name: 'crt_id',         type: 'string'   , defaultValue : _global.login_pk } /* 데이터 생성자 명 */
    ]
});
