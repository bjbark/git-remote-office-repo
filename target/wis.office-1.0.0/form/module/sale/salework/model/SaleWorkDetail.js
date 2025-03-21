Ext.define('module.sale.salework.model.SaleWorkDetail', { extend : 'Axt.data.Model',
	fields : [
	        { name : 'hq_id'            , type : 'string', defaultValue : _global.hq_id }, /* 본사 ID */
			{ name : 'stor_grp'         , type : 'string', defaultValue : _global.stor_grp }, /* 매장 그룹 */
			{ name : 'stor_id'          , type : 'string', defaultValue : _global.stor_id }, /* 매장 ID ( 발주 등록 매장 ) */
			{ name : 'stor_wh'          , type : 'string', defaultValue : _global.stor_id }, /* 매입 매장 ID ( 매입 검수를 할 매장 ) */

			{ name : 'invc_numb'           , type : 'string' }, /* 발주 번호 */
			{ name : 'line_seqn'          , type : 'int'    , defaultValue : 0 }, /* 발주 항번 */
			{ name : 'seq_top'          , type : 'int'    , defaultValue : 0 }, /* 상위 상세 번호 */
			{ name : 'seq_dsp'          , type : 'string' }, /* 화면 출력 번호 */
			{ name : 'mst_itm_id'       , type : 'string' }, /* 대표 품목 ID */
			{ name : 'mst_itm_cd'       , type : 'string' }, /* 대표 품목 code */
			{ name : 'item_idcd'           , type : 'string' }, /* 품목 ID */
			{ name : 'item_code'           , type : 'string' }, /* 품목 코드 */
			{ name : 'item_name'           , type : 'string' }, /* 품목 명 */
			{ name : 'item_spec'           , type : 'string' }, /* 품목 규격 */

			{ name : 'brcd'             , type : 'string' }, /* 바코드 */
			{ name : 'itm_shrt_cd'      , type : 'string' }, /* 단축코드 */

			{ name : 'brand_id'         , type : 'string' }, /* 브랜드 명 */
			{ name : 'brand_nm'         , type : 'string' , persist : false }, /* 브랜드 명 */
			{ name : 'maker_id'	        , type : 'string' }, /* 브랜드 명 */
			{ name : 'mfg_nm'           , type : 'string' , persist : false }, /* 제조사 명 */

			{ name : 'txfree_yn'        , type : 'string' , defaultValue : '0' }, /* 면세여부 0:과세 */
			{ name : 'unit_idcd'           , type : 'string' }, /* 품목 단위 ID */
			{ name : 'piece_qty'        , type : 'float'    , defaultValue : 1 }, /* 포장량 */
			{ name : 'unit_name'           , type : 'string' }, /* 품목 단위 ID */

			{ name : 'cust_pri'         , type : 'float'    , defaultValue : 0 }, /* 정상가격 */
			{ name : 'cust_halin'       , type : 'float'    , defaultValue : 0 }, /* UNIT_PRICE PRICE 상품할인 금액 */

			{ name : 'unt_pri'          , type : 'float'    , defaultValue : 0 }, /* 정상가격 */
			{ name : 'itm_dsnt'         , type : 'float'    , defaultValue : 0 }, /* UNIT_PRICE PRICE 상품할인 금액 */
			{ name : 'pri'              , type : 'float'    , defaultValue : 0 }, /* 견적 단가 */
			{ name : 'qty'              , type : 'float'    , defaultValue : 0 }, /* 견적 수량 */
//			{ name : 'org_ord_qty'      , type : 'int'    }, /* 원 발주량 */
//			{ name : 'deli_qty'         , type : 'int'    , defaultValue : 0 }, /* 매입 수량 */
			{ name : 'txfree_amt'       , type : 'float'    , defaultValue : 0 }, /* 면세금액 */
			{ name : 'taxtn_amt'        , type : 'float'    , defaultValue : 0 }, /* 과세금액 */
			{ name : 'sply_amt'         , type : 'float'    , defaultValue : 0 }, /* 공급가 */
			{ name : 'tax_amt'          , type : 'float'    , defaultValue : 0 }, /* 세액 */
			{ name : 'inv_amt'          , type : 'float'    , defaultValue : 0 }, /* 합계금액 */
			{ name : 'po_pri'           , type : 'float'    , defaultValue : 0 }, /* 매입단가 */
			{ name : 'po_pri_type'      , type : 'string' , defaultValue : 1 }, /* 매입가 적용 타입 */
			{ name : 'po_pri_rt'        , type : 'float'  , defaultValue : 0 }, /* 매입가 환산 요율 */
			{ name : 'user_memo'         , type : 'string' }, /* 사용자 메모 */
			{ name : 'upt_usr_nm'       , type : 'string' , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
			{ name : 'crt_usr_nm'       , type : 'string' , defaultValue : _global.login_pk }, /* 데이터 생성자 명 */
			{ name : '_margin'          , type : 'float'  , defaultValue : 0 , persist : true ,
				convert: function (value, model) {
				    if (model.get('pri') == 0) {
				    	return ( 0 );
				    } else {
						return  ((1 - model.get('po_pri') / model.get('pri')) * 100 );
				    }

				}
			}, /* 마진율 */

		 	{name : 'org_invc_numb'        , type : 'string' }, /* 주문 번호 */
		 	{name : 'org_inv_seq'       , type : 'int'    , defaultValue  : 0 }, /* 매출 항번 */
			{name : 'unt_pnt'           , type : 'float'  , defaultValue : 0 }, /* 판매포인트 */
			{name : 'pnt_rt'            , type : 'float'  , defaultValue : 0 }, /* 포인트 적립율 */
			{name : 'itm_pnt'           , type : 'float'  , defaultValue : 0 }, /* 총 발생포인트 */
		 	{name : 'org_ord_qty'       , type : 'float'  , defaultValue : 0 }, /* 원 발주량 */
		 	{name : 'retn_yn'           , type : 'string'  , defaultValue : '0' }, /* 반품 여부 */
			{name : 'mro_no'            , type : 'string'  }, /* mro 주문 번호 */
		 	{name : 'mro_seq'           , type : 'string'  }  /* mro 주문 상세 번호 */
	],
	recalculation: function( inv ) {
		var row = this,
		    baseamt = row.get('qty') * row.get('pri')
		;

		if (row.get('po_pri_type') != '1') {
			row.set( 'po_pri' ,  ( row.get('pri') * ( row.get( 'po_pri_rt' ) /100 ) ));  //row.get('pri') -
		}
		/* 과세 */
		if (row.get('txfree_yn') == '0') {
			row.set('txfree_amt'   ,   0        );
			row.set('taxtn_amt'    ,   baseamt  );
			var tax_amt = Utils.calcSurtax(baseamt, inv.get('tax_rt' ), (inv.get('tax_type' ) == '0') );
			row.set('sply_amt'     ,   tax_amt.sply_amt  );
			row.set('tax_amt'      ,   tax_amt.tax_amt       );
		} else { /* 면세 */
			row.set('txfree_amt'   ,   baseamt  );
			row.set('taxtn_amt'    ,   0        );
			row.set('sply_amt'     ,   0        );
			row.set('tax_amt'      ,   0        );
		}
		row.set('cust_halin'       ,  (row.get('cust_pri') - row.get('pri'))   *  row.get('qty') );
		row.set('itm_dsnt'         ,  (row.get('unt_pri') - row.get('pri'))   *  row.get('qty') );

		row.set('inv_amt'          ,  row.get('sply_amt') +  row.get('tax_amt') + row.get('txfree_amt'));

		row.set('_margin'          , row.fields.get('_margin' ).convert( 0, row) );
		//row.set('_margin'   , ((1 - row.get('po_pri') / row.get('pri')) * 100 ));
	}

});


