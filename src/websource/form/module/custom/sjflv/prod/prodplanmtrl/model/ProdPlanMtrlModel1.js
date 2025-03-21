Ext.define('module.custom.sjflv.prod.prodplanmtrl.model.ProdPlanMtrlModel1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'		, type: 'string'	// 구매요청 invc_numb
		},{	name: 'item_idcd'		, type: 'string'	// 자재ID
		},{	name: 'item_code'		, type: 'string'	// 자재코드
		},{	name: 'item_name'		, type: 'string'	// 원재료명
		},{	name: 'item_spec'		, type: 'string'	// 원재료규격
		},{	name: 'unit_idcd'		, type: 'string'	// 단위ID
		},{	name: 'prnt_item_code'	, type: 'string'	// 제품코드
		},{	name: 'prnt_item_name'	, type: 'string'	// 품명
		},{	name: 'prnt_item_spec'	, type: 'string'	// 규격
		},{	name: 'purc_qntt'		, type: 'float'		// 의뢰수량
		},{	name: 'plan_invc_numb'	, type: 'string'	// 생산계획 invc_numb
		},{	name: 'plan_line_seqn'	, type: 'string'	// 생산계획 line_seqn
		},{	name: 'plan_yorn'		, type: 'string'	// 생산계획여부
		},{	name: 'pdsd_numb'		, type: 'string'	// 생산계획번호
		},{	name: 'acpt_numb'		, type: 'string'	// 수주invc_numb
		},{	name: 'acpt_amnd_degr'	, type: 'string'	// 수주AMD차수
		},{	name: 'acpt_seqn'		, type: 'int'		// 수주순번
		},{	name: 'invc_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 발주요청일
		},{	name: 'plan_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 생산예정일자
		},{	name: 'deli_date'		, type: 'string'	, convert: Ext.util.Format.strToDate	, serialize: Ext.util.Format.dateToStr	// 납기일자
		}
	]
});
