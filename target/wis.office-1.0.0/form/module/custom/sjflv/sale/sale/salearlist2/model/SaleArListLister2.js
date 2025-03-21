Ext.define('module.custom.sjflv.sale.sale.salearlist2.model.SaleArListLister2',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'item_name',				type: 'string'},		//적요
		{name: 'item_spec',				type: 'string'},		//적요
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//일자ㄴ
		{name: 'sale_amnt',				type: 'float' },		//금액
		{name: 'vatx_amnt',				type: 'float' },	 	//부가세
		{name: 'sale_pric',				type: 'float' },		//단가
		{name: 'ttsm_amnt',				type: 'float' },		//합계
		{name: 'npay_amnt',				type: 'float' },		//미수잔액
		{name: 'sale_qntt',				type: 'float' },		//수량
		{name: 'iomy_amnt',				type: 'float' },		//수금액
		{name: 'drtr_name',				type: 'string' },		//담당자
	]
});
