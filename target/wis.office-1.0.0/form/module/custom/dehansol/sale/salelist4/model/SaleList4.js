Ext.define('module.custom.dehansol.sale.salelist4.model.SaleList4',{ extend:'Axt.data.Model',
	fields : [
		{name: 'cstm_name'			, type: 'string'},		//INVOICE번호
		{name: 'dlvy_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//INVOICE날짜
		{name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//납기일자
		{name: 'plmk_kind_name'		, type: 'string'},		//제판종류
		{name: 'mesh_name'			, type: 'string'},		//망사명
		{name: 'item_name'			, type: 'string'},		//품목명
		{name: 'ostt_qntt'			, type: 'float'},		//수량
		{name: 'sale_pric'			, type: 'float'},		//단가
		{name: 'sale_amnt'			, type: 'float'},		//금액합계
		{name: 'vatx_amnt'			, type: 'float'},		//부가세
		{name: 'succ_pric'			, type: 'float'},		//합계
		{name: 'ttsm_amnt'			, type: 'float'},		//합계
		{name: 'user_memo'			, type: 'string'},		//비고
		{name: 'cstm_total'			, type: 'float'},		//업체계
		{name: 'month_total'		, type: 'float'},		//월누계
	]
});
