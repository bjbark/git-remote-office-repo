Ext.define('module.sale.sale.saleosttlist.model.SaleOsttListDetail', { extend : 'Axt.data.Model',
	fields :
	[
	 	{ name: 'hq_id'				, type : 'string', defaultValue : _global.hq_id }, /* 본사 ID */
	 	{ name: 'stor_id'			, type : 'string', defaultValue : _global.stor_id }, /* 매장 ID ( 발주 등록 매장 ) */
	 	{ name: 'item_idcd'			, type : 'string' },
	 	{ name: 'item_code'			, type : 'string' },
	 	{ name: 'brcd'				, type : 'string' },
	 	{ name: 'item_name'			, type : 'string' },
	 	{ name: 'item_spec'			, type : 'string' },
	 	{ name: 'sale_unit'			, type : 'string' },
		{ name :'itm_shrt_cd'		, type : 'string' }, /* 단축코드 */
	 	{ name: 'seq_dsp'			, type : 'int' 	  },
		{ name: 'unit_name'			, type : 'string' },
		{ name: 'sale_pric'			, type : 'float'  , defaultValue : 0 },
		{ name: 'piece_qty'			, type : 'float'  , defaultValue : 0 },
		{ name: 'unt_pri'			, type : 'float'  , defaultValue : 0 },
		{ name: 'qty'				, type : 'float'  , defaultValue : 0 },
		{ name: 'pri'				, type : 'float'  , defaultValue : 0 },
		{ name: 'txfree_amt'		, type : 'float'  , defaultValue : 0 },
		{ name: 'sply_amt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'tax_amt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'inv_amt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'po_pri'			, type : 'float'  , defaultValue : 0 }, /* 출고시점 구매가 */
		{ name: 'no_delivery_qty'	, type : 'float'  , defaultValue : 0 }, /* 미출수량 */
		{ name: 'ostt_qntt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'ttsm_amnt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'vatx_amnt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'sale_amnt'			, type : 'float'  , defaultValue : 0 },
		{ name : 'cstm_idcd'		, type : 'string' , persist : false }, /* 거래처 ID */
		{ name: 'drtr_idcd'			, type : 'string' }, /* 작업 담당자 ID */
		{ name: 'cstm_name'			, type : 'string' },
		{ name: 'user_memo'			, type : 'string' },
		{ name: 'line_clos'			, type : 'string' },
		{ name: 'invc_date'			, type : 'string' },
		{ name: 'bzpl_idcd'			, type : 'string' },
		{ name: 'item_bacd_name'	, type : 'string' },
		{ name: 'item_clss_bacd_name'	, type : 'string' },

		{ name: 'mtrl_bacd_name'	, type : 'string' },	//재질구분
		{ name: 'make_bacd_name'	, type : 'string' },	//제조구분
		{ name: 'pcod_numb'			, type : 'string' },	//고객발주번호
		{ name: 'cstm_mold_code'	, type : 'string' },	//고객금형코드
		{ name: 'drwg_numb'			, type : 'string' }, 	//도면번호
		{ name: 'remk_text'			, type : 'string' },	//비고
		{ name: 'drwg_numb'			, type : 'string' },	//도면정보번호

		/* 상품별 현황 */
		{ name: 'acpt_numb'			, type : 'string' },
		{ name: 'cust_idcd'			, type : 'string' },
		{ name: 'cust_name'			, type : 'string' },
		{ name: 'mmb_id'			, type : 'string' },
		{ name: 'mmb_nm'			, type : 'string' },
		{ name: 'sply_amt'			, type : 'float'  , defaultValue : 0 },
		{ name: 'inv_dt'			, type : 'string' , convert : Ext.util.Format.strToDate },
		{ name: 'acpt_deli_date'	, type : 'string' , convert : Ext.util.Format.strToDate },
		{ name: 'deli_date'			, type : 'string' , convert : Ext.util.Format.strToDate },
		{ name: 'invc_numb'			, type : 'string' },
		{ name: 'req_msg'			, type : 'string' },
		{ name: 'pack_zone_nm'		, type : 'string' },
		{ name: 'mfg_nm'			, type : 'string' },
		{ name: 'stor_nm'			, type : 'string' },
		{ name: 'stor_price'		, type : 'float'  , defaultValue : 0 },
		{ name: 'hq_price'			, type : 'float'  , defaultValue : 0 },
		{ name: 'stock'				, type : 'float'  , defaultValue : 0 },

		/*--------------------------------*/

		{ name : 'def_qty'			, type : 'float'  , defaultValue : 0 , persist : false ,
			convert: function (value, model) {
				return  ( model.get('stock') - model.get('qty') );
			}
		}, /* 과부족  현재고 - 확정수량 */

		{ name: 'sale_invc_date'	, type : 'string', convert : Ext.util.Format.strToDate },
		{ name: 'acpt_invc_date'	, type : 'string', convert : Ext.util.Format.strToDate }
	]

});
