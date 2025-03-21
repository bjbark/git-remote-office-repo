Ext.define('module.mtrl.istt.isttsumlist.model.IsttSumListMaster',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'line_seqn',			type: 'float' },		//순번
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_code',			type: 'string'},		//거래처코드
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'istt_qntt',			type: 'float' },		//입고수량
		{	name: 'istt_wrhs_idcd',		type: 'string'},		//입고창고ID
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'lott_numb',			type: 'string'},		//batch
		{	name: 'qntt',				type: 'float'},			//
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'istt_pric',			type: 'float'},		//평균단가
		{	name: 'istt_amnt',			type: 'float'},		//공급가액
		{	name: 'istt_vatx',			type: 'float'},		//부가세
		{	name: 'ttsm_amnt',			type: 'float'},		//합계금액

	]
});
