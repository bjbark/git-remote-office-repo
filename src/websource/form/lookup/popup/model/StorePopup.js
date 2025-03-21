Ext.define('lookup.popup.model.StorePopup',{ extend:'Axt.data.Model',
    fields: [
     	    {name: 'corp_id',         		type: 'string'  , defaultValue : _global.corp_id },
     	    {name: 'corp_nm',         		type: 'string'  , defaultValue : _global.corp_nm },
     	    {name: 'hq_id',         		type: 'string'  , defaultValue : _global.hq_id },
    	    {name: 'stor_grp',         		type: 'string'  },
          //
    	    {name: 'stor_sts',        		type: 'string'  },

    	    {name: 'stor_id',         	    type: 'string'  },
    	    {name: 'stor_cd',         	    type: 'string'  },
    	    {name: 'stor_nm',       	    type: 'string'  },
    	    {name: 'owner_id',         	    type: 'string'  },
    	    {name: 'owner_nm',         	    type: 'string'  },
       	    {name: 'wrhs_id',         	    type: 'string'  },
       	    {name: 'wareh_nm',         	    type: 'string'  },
       	    {name: 'stor_gb',         	    type: 'string'  },

    	    {name: 'item_cd_issue', 	    type: 'string'  },

            {name: 'biz_tel_no',         	type: 'string'  },
            {name: 'biz_owner' ,       	    type: 'string'  },
            {name: 'biz_addr_1',         	type: 'string'  },
            {name: 'biz_addr_2',      	    type: 'string'  },
            {name: 'addr' ,          	    type: 'string'  },

            {name: 'row_sts' ,       	    type: 'string'  }
    ]
});
