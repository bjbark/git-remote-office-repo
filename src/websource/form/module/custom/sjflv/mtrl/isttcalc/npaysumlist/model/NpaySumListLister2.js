Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.model.NpaySumListLister2',{ extend:'Axt.data.Model',
	fields:
	[	
	 	{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//일자ㄴ
		{name: 'item_name',				type: 'string'},		//적요
		{name: 'item_spec',				type: 'string'},		//적요		
		{name: 'istt_qntt',				type: 'float' },		//수랭
		{name: 'istt_pric',				type: 'float' },	 	//단가
		{name: 'istt_amnt',				type: 'float' },		//금액
		{name: 'vatx_amnt',				type: 'float' },		//부가세
		{name: 'ttsm_amnt',				type: 'float' },		//합계금액
		{name: 'iomy_amnt',				type: 'float' },		//지급금액
		{name: 'npay_amnt',				type: 'float' },		//미지급금
	]
});
