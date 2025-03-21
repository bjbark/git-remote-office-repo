Ext.define( 'module.custom.iypkg.etc.trsfwork.model.TrsfWorkLister1', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//운송일자
		{	name: 'cstm_idcd',			type: 'string'},		//출고거래처ID
		{	name: 'ostt_cstm',			type: 'string'},		//출고거래처
		{	name: 'cars_idcd',			type: 'string'},		//차량ID
		{	name: 'cars_numb',			type: 'string'},		//차량번호
		{	name: 'crrr_name',			type: 'string'},		//운송자명
		{	name: 'need_time',			type: 'string'},		//소요시간
		{	name: 'runn_dist',			type: 'string'},		//운행거리
		{	name: 'ttsm_amnt',			type: 'float' },		//매출액
		{	name: 'trnt_exps',			type: 'float' },		//운송비
		{	name: 'qntt',				type: 'float' },		//운송량
		{	name: 'ostt_qntt',			type: 'float' },		//출고량
		{	name: 'totl_mxm2',			type: 'float' },		//총m2 (각item별)
	]
});
