Ext.define('module.custom.iypkg.stock.isos.osttwaitlist.model.OsttWaitList2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//납기일자
		},{	name: 'cstm_idcd'			, type: 'string'		//거래처ID
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'prod_idcd'			, type: 'string'		//품목ID
		},{	name: 'prod_name'			, type: 'string'		//품명
		},{	name: 'prod_leng'			, type: 'float'			//장
		},{	name: 'prod_widh'			, type: 'float'			//폭
		},{	name: 'prod_hght'			, type: 'float'			//고
		},{	name: 'pqty_pric'			, type: 'float'			//단가/개
		},{	name: 'ostt_qntt'			, type: 'float'			//출고수량
		},{	name: 'acpt_qntt'			, type: 'float'			//수주수량
		},{	name: 'prod_qntt'			, type: 'float'			//생산수량
		},{	name: 'trst_qntt'			, type: 'float'			//계획량
		},{	name: 'unostt'				, type: 'float'			//미출고잔량

		},{	name: 'offr_qntt'			, type: 'float'			//발주수량 = 원단발주수량
		},{	name: 'istt_qntt'			, type: 'float'			//입고수량 = 원단입고수량

		},{	name: 'sply_amnt'			, type: 'float'			//판매금액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세금액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액

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
	]
});