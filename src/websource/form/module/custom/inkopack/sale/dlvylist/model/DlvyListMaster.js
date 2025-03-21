Ext.define('module.custom.inkopack.sale.dlvylist.model.DlvyListMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'dlvy_tele_numb'		, type: 'string'	//전화번호
		},{	name: 'dlvy_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//배송일자
		},{	name: 'dlvy_addr'			, type: 'string'	//주소
		},{	name: 'dlvy_exps'			, type: 'float'		//배송비
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처
		},{	name: 'pric_burd_dvcd'		, type: 'string'	//운임부담코드
		},{	name: 'rctr_name'			, type: 'string'	//수취인명
		},{	name: 'dlvy_atcl'			, type: 'string'	//전달사항
		},{	name: 'dlvy_hope_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//배송희망날짜
		},{	name: 'dlvy_mthd_dvcd'		, type: 'string'	//배송방법구분코드
		}

	]
});