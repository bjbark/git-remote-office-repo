Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.model.OsttWaitList', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'acpt_seqn'			, type: 'float'			//수주순번
		},{	name: 'invc_numb'			, type: 'string'		//출고번호
		},{	name: 'line_seqn'			, type: 'float'			//출고순번
		},{	name: 'invc_date'			, type: 'string' , convert : Ext.util.Format.strToDateTime		//매출일자(출고일자)
		},{	name: 'cstm_idcd'			, type: 'string'		//거래처ID
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'prod_idcd'			, type: 'string'		//품목ID
		},{	name: 'prod_name'			, type: 'string'		//품명
		},{	name: 'item_leng'			, type: 'float'			//장
		},{	name: 'item_widh'			, type: 'float'			//폭
		},{	name: 'item_hght'			, type: 'float'			//고
		},{	name: 'ostt_qntt'			, type: 'float'			//출고수량
		},{	name: 'acpt_qntt'			, type: 'float'			//수주수량
		},{	name: 'pqty_pric'			, type: 'float'			//단가/개
		},{	name: 'sale_amnt'			, type: 'float'			//판매금액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'deli_date'			, type: 'string' , serialize: Ext.util.Format.dateToStr
		},{	name: 'pcod_numb'			, type: 'string' ,		//PONO

		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'user_memo'			, type: 'string'		//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'		//찾기명
		},{	name: 'updt_user_name'		, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'		//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		}
	],
//	recalculation : function(inv) {
//		var row = this,
//			baseamt = row.get('esti_qntt') * row.get('sale_pric')
//		;
//		row.set('sply_amnt'	, Math.floor(row.get('esti_qntt') * row.get('sale_pric') /10)*10 );
//		row.set('vatx_amnt'	, Math.floor(Number(_global.tax_rt) * row.get('sply_amnt')/1000)*10 );
//		row.set('ttsm_amnt'	, row.get('sply_amnt') + row.get('vatx_amnt')) ;
//	}
});