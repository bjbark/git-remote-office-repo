Ext.define('module.sale.project.salework.model.SaleWorkListerPopup',{ extend:'Axt.data.Model',
	fields : [
		{name: 'invc_numb',				type: 'string'},		//프로젝트수주ID
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'amnd_degr',				type: 'float' },		//AMD차수
		{name: 'cofm_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//확정일자
		{name: 'plan_amnt',				type: 'float'},			//계획금액
		{name: 'ttsm_amnt',				type: 'float'},			//계산서발행금액
		{name: 'notp_amnt',				type: 'float'},			//미발행잔액
		{name: 'sale_amnt',				type: 'float'},			//발행금액
		{name: 'item_idcd',				type: 'string'},			//품목ID
		{name: 'actm_idcd',				type: 'string'},		//수주번호(금형번호)
		{name: 'modify',				type: 'string'},		//
		{name: 'crte_idcd',				type: 'string'},		//
		{name: 'updt_idcd',				type: 'string'},		//

/* form data */
		{name: 'form_invc_numb',			type: 'string'},		//프로젝트수주ID
		{name: 'form_degr',					type: 'float' },		//AMD차수
		{name: 'form_drtr_idcd',			type: 'string' },		//담당자ID
		{name: 'form_invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//확정일자
		{name: 'form_sale_amnt',			type: 'float'},			//공급가
		{name: 'form_vatx_amnt',			type: 'float'},			//부가세
		{name: 'form_ttsm_amnt',			type: 'float'},			//합계
		{name: 'form_cstm_idcd',			type: 'string'},		//거래처
		{name: 'form_remk_text',			type: 'string'},		//적요
		{name: 'form_cstm_name',			type: 'string'},		//거래처명
		{name: 'stor_id',					type: 'string'},		//
		{name: 'modify',					type: 'string'},		//
	],
	recalculation : function(inv) {
		var row = this
		;
		row.set('vatx_amnt'	, Math.floor(row.get('sale_amnt')/1000)*10 );
		row.set('ttsm_amnt'	, row.get('sale_amnt') + row.get('vatx_amnt')) ;
	}
});