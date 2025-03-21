Ext.define('module.custom.kitec.prod.prodplan.model.ProdPlan2',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'		, type : 'string'			//계획번호
		},{	name : 'pror_numb'		, type : 'string'			//지시번호
		},{	name : 'bzpl_idcd'		, type : 'string', defaultValue : _global.stor_id		//사업장ID
		},{	name : 'item_idcd'		, type : 'string'			//품목ID
		},{	name : 'item_name'		, type : 'string'			//품목명
		},{	name : 'item_code'		, type : 'string'			//품목코드
		},{	name : 'cvic_idcd'		, type : 'string'			//설비ID
		},{	name : 'cvic_name'		, type : 'string'			//설비명
		},{	name : 'lott_numb'		, type : 'string'			//LOT번호
		},{	name : 'plan_sttm'		, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//시작일자
		},{	name : 'plan_edtm'		, type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//종료일자
		},{	name : 'plan_qntt'		, type : 'float'			//계획수량(L)
		},{	name : 'plan_qntt_1fst'	, type : 'float'			//계획수량1(R)
		},{	name : 'prod_trst_dvcd'	, type : 'string'			//생산의뢰구분코드
		}
	]
});
