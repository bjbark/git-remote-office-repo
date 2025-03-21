Ext.define('lookup.popup.cateinfo.model.CateInfoPopup',{ extend:'Axt.data.Model', 
    fields: 
    [
     	{name: 'hq_id',         		type: 'string'  },
        {name: 'shop_gp',               type: 'string'  },
        {name: 'shop_id',               type: 'string'  },
     	// 
     	{name: 'prnt_id',         	type: 'string'  }, /* pair */
     	{name: 'cate_id',         	    type: 'string'  }, /* pair */
     	{name: 'cate_cd',         	    type: 'string'  },
     	{name: 'cate_nm',       	    type: 'string'  }, /* name */ 
     	{name: 'cate_ds',       	    type: 'string'  },  /* name */ 
     	{name: 'prdt_key',       	    type: 'string'  },  /* name */ 
     	{name: 'code_len',       	    type: 'string'  }  /* name */ 
     ]
});
