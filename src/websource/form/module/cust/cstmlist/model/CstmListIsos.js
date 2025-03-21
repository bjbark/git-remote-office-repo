Ext.define('module.cust.cstmlist.model.CstmListIsos',{ extend:'Axt.data.Model',
	fields  : [
			{	name: 'wrhs_idcd',			type: 'string'},		//창고ID
			{	name: 'item_clss_bacd_name'	, type: 'string' },		//품목군
			{	name: 'item_code',			type: 'string'},		//품목코드
			{	name: 'item_idcd',			type: 'string'},		//품목ID
			{	name: 'item_name',			type: 'string'},		//품명
			{	name: 'item_spec',			type: 'string'},		//규격
			{	name: 'remk_text',			type: 'string'},		//수불구분
			{	name: 'cstm_name',			type: 'string'},		//수불거래처
			{	name: 'istt_qntt',			type: 'float '},		//입고수량
			{	name: 'ostt_qntt',			type: 'float '},		//출고수량
	]
});
