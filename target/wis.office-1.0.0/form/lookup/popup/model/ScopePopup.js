Ext.define('lookup.popup.model.ScopePopup',{ extend:'Axt.data.Model', 
    fields:[
     	{name: 'hq_id',         		type: 'string'  },
     	{name: 'stor_grp',         		type: 'string'  },
    	{name: 'stor_nm',         	    type: 'string'  }, 
     	// 
     	{name: 'wk_scope',         	    type: 'string'  },
     	{name: 'scope_cd',         	    type: 'string'  },
     	{name: 'scope_nm',       	    type: 'string'  },   
        {name: 'row_sts',         	type: 'string'  },
     	{name: 'row_ord',       	    type: 'int'     , defaultvalue : 0  }  
     	
     ]
});
