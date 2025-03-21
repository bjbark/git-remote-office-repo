Ext.define('lookup.popup.itemzone.model.ItemZonePopup',{ extend:'Axt.data.Model', 
    fields: 
    [
     	{name: 'hq_id',         		type: 'string'  },
     	{name: 'stor_grp',         		type: 'string'  },
     	{name: 'stor_id',         		type: 'string'  },
     	// 
     	{name: 'prnt_id',         	type: 'string'  }, /* pair */
     	{name: 'zone_id',         	    type: 'string'  }, /* pair */
     	{name: 'zone_cd',         	    type: 'string'  },
     	{name: 'zone_nm',       	    type: 'string'  }, /* name */ 
     	{name: 'zone_desct',       	    type: 'string'  },  /* name */ 
     	{name: 'row_lvl',       	    type: 'string'  }  /* name */ 
     ]
});
