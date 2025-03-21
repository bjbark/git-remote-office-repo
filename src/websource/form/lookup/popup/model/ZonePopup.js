Ext.define('lookup.popup.model.ZonePopup',{ extend:'Axt.data.Model', 
    fields: 
    [
     	{name: 'hq_id',         		type: 'string'  },
        {name: 'stor_grp',              type: 'string'  },
        {name: 'stor_id',              type: 'string'  },
     	// 
        {name: 'zone_id',               type: 'string'  },
        {name: 'zone_cd',               type: 'string'  },
        {name: 'zone_nm',               type: 'string'  },
     	{name: 'zone_gb',         	    type: 'string'  },
     	//
     	{name: 'affix_gb',         	    type: 'string'  },
     	{name: 'affix_cd',       	    type: 'string'  }
    ]
});
