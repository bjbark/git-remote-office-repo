Ext.define( 'module.cust.cstmlist.model.CstmListOrder', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//주문일자
		{	name: 'line_seqn',			type: 'float'  , defaultValue : 0},	//순번
		{	name: 'invc_numb',			type: 'string' },		//주문번호
		{	name: 'item_clss_bacd_name'	, type: 'string' },		//품목군
		{	name: 'item_name',			type: 'string' },		//품명
		{	name: 'item_spec',			type: 'string' },		//규격
		{	name: 'tick_valu',			type: 'string' },		//두께
		{	name: 'invc_qntt',			type: 'float'  },		//수량
		{	name: 'unit_idcd',			type: 'string' },		//단위
		{	name: 'user_memo',			type: 'string'  },		//기타사양
		{	name: 'invc_pric',			type: 'float'  },		//견적단가
		{	name: 'ostt_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//출고일자
		{	name: 'ostt_qntt',			type: 'float ' },		//출고수량
		{	name: 'ttsm_amnt',			type: 'float ' },		//출고금액
		{	name: 'remk_text',			type: 'string' },		//비고
	]
});
