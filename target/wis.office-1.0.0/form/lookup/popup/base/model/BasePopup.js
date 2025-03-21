Ext.define('lookup.popup.base.model.BasePopup',{ extend:'Axt.data.Model',
    fields: [
    	     {name: 'hq_id',         	type: 'string'  , defaultValue : _global.hq_id }
    		,{name: 'stor_grp',        	type: 'string'  , defaultValue : _global.stor_grp }
    	    ,{name: 'bas_id',       	type: 'string'  }
    	    ,{name: 'bas_cd', 	        type: 'string'  }
    	    ,{name: 'bas_nm', 	        type: 'string'  }
    	    ,{name: 'bas_nm_englh', 	        type: 'string'  }
    	    ,{name: 'prnt_id', 	        type: 'string'  }
    	    ,{name: 'prdt_key', 	    type: 'string'  }
    	    ,{name: 'code_len', 	    type: 'string'  }
    	    ,{name: 'row_lvl', 	        type: 'string'  , defaultValue:'5'}
    	    ,{name: 'row_sts',         	type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
    	    ,{name: 'user_memo', 	    type: 'string'  }
    ]
});
