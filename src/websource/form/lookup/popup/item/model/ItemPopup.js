Ext.define('lookup.popup.item.model.ItemPopup',{ extend:'Axt.data.Model', 
	fields: [
	    {   name: 'stor_grp'			, type: 'string'  , defaultValue : _global.stor_grp },
	    {   name: 'stor_id'			, type: 'string'  , defaultValue : _global.stor_id },
	    {   name: 'mst_itm_id'				, type: 'string'  },
	    {   name: 'mst_itm_cd'				, type: 'string'  },
	    {   name: 'item_idcd'				, type: 'string'  },
	    {   name: 'item_code'				, type: 'string'  },
	    {   name: 'item_name'				, type: 'string'  },
	    {   name: 'item_ds'				, type: 'string'  },
	    {   name: 'item_spec'				, type: 'string'   , persist : false },
	    {   name: 'unit_idcd'				, type: 'string'   , persist : false },
	    {   name: 'unit_name'				, type: 'string'   , persist : false },
	    {   name: 'unt_qty'			, type: 'float'    , defaultValue : 0 , persist : false },
	    {   name: 'class_nm'			, type: 'string'   , persist : false },
	    {   name: 'brand_id'			, type: 'string'   },
	    {   name: 'brand_nm'			, type: 'string'   , persist : false },
	    {   name: 'mfg_id'				, type: 'string'   },
	    {   name: 'mfg_nm'				, type: 'string'   , persist : false },
	    {   name: 'notax_yn'			, type: 'string'   , defaultValue : 0 , persist : false }, // 0 : 과세, 1 : 면세
	    {   name: 'cst_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 소비자가 */
	    {   name: 'stad_sale_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 판매단가 */
	    {   name: 'cust_price'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 고객단가 */
	    {   name: 'epo_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 프로모션가 */
	    {   name: 'po_pri'			, type: 'float'    , defaultValue : 0 , persist : false },
	    {   name: 'po_pri_type'		, type: 'int'      , defaultValue : 1 , persist : false },
        {   name: 'po_pri_rt'       , type: 'float'    , defaultValue : 0 , persist : false },
        
        {   name: 'web_price'           , type: 'float'    , defaultValue : 0 , persist : false },
        
	    {   name: 'sales_id'		    , type: 'string'   , defaultValue : '5105000' , persist : false },
	    {   name: 'sales_nm'		    , type: 'string'   , persist : false },
   	    {   name: 'scm_yn'		        , type: 'string'   , persist : false },
//   	    {   name: 'pack_gb'		        , type: 'string'   , persist : false },
	    {   name: 'vend_id'				, type: 'string'   , defaultValue : '0', persist : false },
	    {   name: 'vend_nm'				, type: 'string'   , persist : false },
//	    {   name: 'pack_vend_id'		, type: 'string'   , persist : false },
//	    {   name: 'pack_vend_nm'		, type: 'string'   , persist : false },
	    {   name: 'pkg_id'		        , type: 'string'   , persist : false },
	    {   name: 'pkg_nm'		        , type: 'string'   , persist : false },
//	    {   name: 'pack_zone_id'		, type: 'string'   , persist : false },
//	    {   name: 'pack_zone_nm'		, type: 'string'   , persist : false },
	    {   name: 'stock'	    		, type: 'float'    , defaultValue : 0 , persist : false }, /* 현재고 */
	    {   name: 'bunch_gb'			, type: 'string'   , persist : false }, /* 0:일반상품/1:결합상품/2:셋트구성 */
	    {   name: 'prnt_id'			, type: 'string'   , persist : false }, /* 결합상품 ID   */
	    {   name: 'seq_qty'				, type: 'float'    , persist : false }, /* 구성상품 수량 */
	    {   name: 'brcd_1'			, type: 'string'  }, /* 바코드 */
        {   name: 'barcode'             , type: 'string'  },  /* 바코드 */
        {   name: 'stk_itm_id'            , type: 'string'  }  /*  */
	]
});

