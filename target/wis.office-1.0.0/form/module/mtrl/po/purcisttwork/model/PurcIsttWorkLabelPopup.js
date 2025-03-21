Ext.define('module.mtrl.po.purcisttwork.model.PurcIsttWorkLabelPopup',{ extend:'Axt.data.Model',
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
	]
});
