Ext.define('lookup.popup.cust.model.B2BCustGroupPopup',{ extend:'Axt.data.Model', 
    fields: [

     	 	 {name: 'hq_id',         	type: 'string'  , defaultValue : _global.hq_id },
             {name: 'stor_grp',             type: 'string'  , defaultValue : _global.stor_grp },
             {name: 'stor_id',             type: 'string'  , defaultValue : _global.stor_id },

     	     {name: 'small_grp',        		type: 'string'  },
     	     {name: 'small_id',        		type: 'string'  },
     	     {name: 'small_nm',        		type: 'string'  },
             
     	     {name: 'cust_grp',        		type: 'string'  },
     	     {name: 'cust_gn',         	    type: 'string'  },
     	    
             {name: 'biz_gb',               type: 'string'  , defaultValue :1 },  /* 법인 구분       */
             {name: 'biz_no',               type: 'string'  },
             {name: 'biz_nm',               type: 'string'  },
             {name: 'biz_kind',             type: 'string'  },
             {name: 'biz_type',            type: 'string'  },
             {name: 'biz_owner',            type: 'string'  },
             {name: 'biz_email',            type: 'string'  },
             {name: 'biz_tel_no',           type: 'string'  },
             {name: 'biz_hp_no',           type: 'string'  },
             {name: 'biz_fax_no',           type: 'string'  },
             {name: 'biz_taxtn_gb',           type: 'string'  , defaultValue :0 },  /* 사업자 과세구분 */
             {name: 'biz_state',            type: 'string'  },
             {name: 'biz_city',             type: 'string'  },
             {name: 'biz_dong',             type: 'string'  },
             {name: 'biz_zip_cd',           type : 'string'  , convert : Ext.util.Format.StrToZip, serialize : Ext.util.Format.ZipToStr },
             {name: 'biz_addr_1',            type: 'string'  },
             {name: 'biz_addr_2',            type: 'string'  },
             {name: 'biz_image',            type: 'string'  },
             
     	     {name: 'home_page',         	type: 'string'  }, 
             
             {name: 'user_memo',            type: 'string'  },
             {name: 'sys_memo',            type: 'string'  },
             {name: 'row_sts',            type: 'string' , defaultValue: '0' }
    ]
});
