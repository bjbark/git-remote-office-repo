Ext.define('module.sale.sale.salearlist1.model.SaleArList1',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'invc_numb',				type: 'string'},		//단위ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'item_code',				type: 'string'},		//품목규격
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'item_name',				type: 'string'},		//품목명
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//수금일자
		{name: 'sale_qntt',				type: 'float', },		//수량
		{name: 'sale_pric',				type: 'float', },		//가격
		{name: 'sale_amnt',				type: 'float', },	 	//공급가액
		{name: 'vatx_amnt',				type: 'float', },		//부가세금액
		{name: 'ttsm_amnt',				type: 'float', },		//합계금액
		{name: 'iomy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	//수금일자
		{name: 'colt_amnt',				type: 'float', },		//미수금액
		{name: 'baln',					type: 'float', },		//미수잔액

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
