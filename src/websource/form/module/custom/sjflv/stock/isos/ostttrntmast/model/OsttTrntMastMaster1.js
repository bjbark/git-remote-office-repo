Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.model.OsttTrntMastMaster1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string' },		//INVOICE번호
		{	name: 'invc_date'			, type: 'string'  , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },	//지시일자
		{	name: 'dlvy_dinv_numb'		, type: 'string' },		//출고번호
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'dlvy_cstm_idcd'		, type: 'string' },		//납품처ID
		{	name: 'dlvy_cstm_name'		, type: 'string' },		//납품처명
		{	name: 'deli_date'			, type: 'string'  ,	convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },	//납기일자
		{	name: 'drtr_name'			, type: 'string' },		//담당자명
		{	name: 'dlvy_mthd_dvcd'		, type: 'string' },		//운송방법
		{	name: 'hdco_idcd'			, type: 'string' },		//택배사ID
		{	name: 'hdco_name'			, type: 'string' },		//택배사명
		{	name: 'dlvy_exps'			, type: 'float'  },		//운송비용
		{	name: 'dlvy_taxn_yorn'		, type: 'string' },		//운송비용부가세포함
		{	name: 'dlvy_memo'			, type: 'string' },		//운송비고
		{	name: 'ostt_yorn'			, type: 'string' },		//출고유형
		{	name: 'ostt_item_list'		, type: 'string' },		//비고
		{	name: 'ostt_numb'			, type: 'string' }, 	//출고번호
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
	]
});
