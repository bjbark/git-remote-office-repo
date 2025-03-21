Ext.define('module.workshop.sale.order.ordermast.model.OrderMastShetLister',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' },		//상담번호
		{	name: 'line_seqn'			, type: 'float ' },		//순번
		{	name: 'fabc_idcd'			, type: 'string' },		//원단ID
		{	name: 'fabc_name'			, type: 'string' },		//용지명
		{	name: 'shet_wght'			, type: 'int'},		//평량
		{	name: 'prnt_colr_bacd_shet'	, type: 'string' },		//인쇄컬러분류코드
		{	name: 'prnt_colr_bacd'		, type: 'string' },		//인쇄컬러분류코드
		{	name: 'prnt_mthd_dvcd'		, type: 'string' },		//인쇄방식구분코드
		{	name: 'esti_pric'			, type: 'float' },		//견적단가
		{	name: 'item_scls_idcd'		, type: 'string' },		//견적단가
		{	name: 'qntt'				, type: 'float' },		//페이지수
		{	name: 'esti_amnt'			, type: 'float' ,defaultValue : 0 },		//견적금액
	]
});

