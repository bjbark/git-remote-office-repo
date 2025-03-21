Ext.define('module.custom.sjflv.sale.sale.salearlist.model.SaleArList',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'base_amnt',				type: 'float', },		//기초채권
		{name: 'sale_amnt',				type: 'float', },		//매출
		{name: 'note_amnt',				type: 'float', },	 	//어음
		{name: 'colt_amnt',				type: 'float', },		//현금
		{name: 'ttsm_amnt',				type: 'float', },		//수금합계
		{name: 'npay_amnt',				type: 'float', },		//잔액
		{name: 'drtr_name',				type: 'string', },		//담당자
		{name: 'buss_numb',				type: 'string', },		//사업자번호
		{name: 'boss_name',				type: 'string', },		//대표자
		{name: 'tele_numb',				type: 'string', },		//전화
		{name: 'mail_addr',				type: 'string', },		//메일
		{name: 'cstm_addr',				type: 'string', },		//주소
		
	]
});
