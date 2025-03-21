Ext.define('lookup.popup.item.model.ItemSharePopup', { extend:'Axt.data.Model', 
	fields: [
	 	{   name: 'hq_id'			, type: 'string'  , defaultValue : _global.hq_id },
	    {   name: 'stor_grp'			, type: 'string'  , defaultValue : _global.stor_grp },
	    {   name: 'stor_grp'			, type: 'string'  , defaultValue : _global.stor_grp },
	    {   name: 'stor_id'			, type: 'string'  , defaultValue : _global.stor_id },
	    {   name: 'mngt_stor_id'			, type: 'string'  , defaultValue : _global.stor_id },
	    {   name: 'share_gp'			, type: 'string'  },
	    
	    {   name: 'using_yn'			, type: 'string'  }, /* 0 :없음 / 1 : 있음   */
	    {   name: 'shr_yn'			, type: 'string'  }, /* 공통상품 여부 0:매장, 1:공통 */
	    {   name: 'mst_itm_id'				, type: 'string'  },
	    {   name: 'mst_itm_cd'				, type: 'string'  },
	    {   name: 'item_idcd'				, type: 'string'  },
	    {   name: 'item_code'				, type: 'string'  },
	    {   name: 'item_name'				, type: 'string'  },
	    {   name: 'item_spec'				, type: 'string'   , persist : false },
	    {   name: 'unit_idcd'				, type: 'string'   , persist : false },
	    {   name: 'unit_name'				, type: 'string'   , persist : false },
	    {   name: 'piece_qty'			, type: 'float'    , defaultValue : 0 , persist : false },
	    {   name: 'clss_nm'			, type: 'string'   , persist : false },
	    {   name: 'brand_id'			, type: 'string'   },
	    {   name: 'brand_nm'			, type: 'string'   , persist : false },
	    {   name: 'maker_id'				, type: 'string'   },
	    {   name: 'mfg_nm'				, type: 'string'   , persist : false },
	    {   name: 'txfree_yn'			, type: 'string'   , defaultValue : 0 , persist : false }, // 0 : 과세, 1 : 면세
	    {   name: 'cst_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 소비자가 */
	    {   name: 'sale_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 판매단가 */
	    {   name: 'cust_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 고객단가 */
	    {   name: 'epo_pri'			, type: 'float'    , defaultValue : 0 , persist : false }, /* 프로모션가 */
	    {   name: 'po_pri'			, type: 'float'    , defaultValue : 0 , persist : false },
	    {   name: 'po_pri_type'		, type: 'int'      , defaultValue : 1 , persist : false },
	    {   name: 'po_pri_rt'		, type: 'float'    , defaultValue : 0 , persist : false },
	    {   name: 'sales_id'		    , type: 'string'   , defaultValue : '5105000' , persist : false },
	    {   name: 'sales_nm'		    , type: 'string'   , persist : false },
   	    {   name: 'pack_gb'		        , type: 'string'   , persist : false },
	    {   name: 'vend_id'				, type: 'string'   , defaultValue : '0', persist : false },
	    {   name: 'vend_nm'				, type: 'string'   , persist : false },
//	    {   name: 'pack_vend_id'		, type: 'string'   , persist : false },
//	    {   name: 'pack_vend_nm'		, type: 'string'   , persist : false },
	    {   name: 'pack_zone_id'		, type: 'string'   , persist : false },
	    {   name: 'pack_zone_nm'		, type: 'string'   , persist : false },
	    {   name: 'stock'	    		, type: 'float'    , defaultValue : 0 , persist : false }, /* 현재고 */
	    {   name: 'brcd_1'			, type: 'string'  }  /* 바코드 */
	]
});

