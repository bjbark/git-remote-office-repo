Ext.define('lookup.popup.shopcust.model.ShopCustPopup',{ extend:'Axt.data.Model', 
    fields: 
    [
     	{name: 'hq_id',             type: 'string'  , defaultValue : _global.hq_id },
     	{name: 'stor_id',        	   type: 'string'  , defaultValue : _global.stor_id },
     	{name: 'cust_grp',       	   type: 'string'  },
     	{name: 'cust_id',       	   type: 'string'  },
     	{name: 'cust_cd', 	           type: 'string'  },
     	{name: 'cust_nm', 	           type: 'string'  },
     	{name: 'mmb_nm', 	           type: 'string'  },
     	{name: 'login_id', 	           type: 'string'  },
     	
     	{name: 'cust_gb', 	           type: 'string'  },
     	{name: 'cust_sts',             type: 'string'  },
     	{name: 'biz_nm',               type: 'string'  },
     	{name: 'biz_no',               type: 'string'  },
     	{name: 'biz_type',            type: 'string'  },
     	{name: 'biz_type',             type: 'string'  },
     	{name: 'biz_tel_no',           type: 'string'  },
     	{name: 'biz_addr_1',            type: 'string'  },
     	{name: 'biz_addr_2',            type: 'string'  },
     	{name: 'biz_owner',            type: 'string'  },
     	{name: 'sts_memo',             type: 'string'  },
     	{name: 'row_sts',            type: 'string'  , defaultValue: '0' },
     	{name: 'user_memo', 	       type: 'string'  }
    ]
});
