Ext.define('lookup.popup.item.model.ItemClassPopup',{ extend:'Axt.data.Model',
    fields : [
     	{name: 'hq_id',         		type: 'string'  },
     	{name: 'stor_grp',         		type: 'string'  },
     	//
     	{name: 'prnt_id',         		type: 'string'  }, /* pair */
     	{name: 'clss_id',         	    type: 'string'  }, /* pair */
     	{name: 'clss_cd',         	    type: 'string'  },
     	{name: 'clss_nm',       	    type: 'string'  }, /* name */
     	{name: 'clss_desct',       	    type: 'string'  },  /* name */
     	{name: 'itm_issu_key',     	    type: 'string'  },  /* name */
     	{name: 'code_len',       	    type: 'string'  }  /* name */
     ]
});
