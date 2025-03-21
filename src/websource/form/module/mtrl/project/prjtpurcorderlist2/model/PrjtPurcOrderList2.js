Ext.define('module.mtrl.project.prjtpurcorderlist2.model.PrjtPurcOrderList2',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb',			type: 'string'},		//발주번호
		{	name: 'istt_vatx',			type: 'float'},			//발주부가세
		{	name: 'deli_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//만기일자
		{	name: 'invc_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//입고일자
		{	name: 'publ_date',			type: 'string' , serialize: Ext.util.Format.dateToStr },		//입고일자
		{	name: 'expr_date',			type: 'string' , serialize: Ext.util.Format.dateToStr },		//입고일자
		{	name: 'istt_amnt',			type: 'float'},			//입고합계
		{	name: 'ttsm_amnt',			type: 'float'},			//입고합계
		{	name: 'istt_qntt',			type: 'float'},			//발주수
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'prnt_idcd',			type: 'string'},		//금형명
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'stot_dvcd',			type: 'string'},		//품명
		{	name: 'amnd_degr',			type: 'float'},			//AMD차수
		{	name: 'line_seqn',			type: 'float'},			//순번
		{	name: 'orig_seqn',			type: 'string'},		//발주순번
		{	name: 'orig_amnd_degr',		type: 'string'},		//발주AMD
		{	name: 'istt_invc_numb',		type: 'string'},		//입고번호
		{	name: 'remk_text',			type: 'string'}			//비고

	]
});
