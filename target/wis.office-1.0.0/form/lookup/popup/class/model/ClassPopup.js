Ext.define('lookup.popup.class.model.ClassPopup',{ extend:'Axt.data.Model', 
    fields: 
    [
     	{name: 'hq_id',         		type: 'string'  },
     	{name: 'stor_grp',         		type: 'string'  },
     	// 
     	{name: 'prnt_id',         	type: 'string'  }, /* pair */
     	{name: 'class_id',         	    type: 'string'  }, /* pair */
     	{name: 'class_cd',         	    type: 'string'  },
     	{name: 'class_nm',       	    type: 'string'  }, /* name */ 
     	{name: 'clss_desct',       	    type: 'string'  },  /* name */ 
     	{name: 'prdt_key',       	    type: 'string'  },  /* name */ 
     	{name: 'code_len',       	    type: 'string'  }  /* name */ 
     ]
});
