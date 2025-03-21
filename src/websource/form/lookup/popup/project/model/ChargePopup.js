Ext.define('lookup.popup.project.model.ChargePopup',{ extend:'Axt.data.Model', 
    fields: 
    [
     	{name: 'charge_id',       	    type: 'string'  },
     	{name: 'charge_nm',       	    type: 'string'  },
     	{name: 'charge_sts',       	    type: 'string'  },
     	//{name: 'login_id',       	    type: 'string'  },
     	{name: 'biz_no',       	        type: 'string'  , convert : Ext.util.Format.StrToBiz , serialize: Ext.util.Format.BizToStr },
     	
     	 
     	{name: 'biz_owner',       	    type: 'string'  },
     	{name: 'biz_addr_1',       	    type: 'string'  },
		
     	
     	
     	{name: 'user_memo',       	    type: 'string'  }
    ]
});
