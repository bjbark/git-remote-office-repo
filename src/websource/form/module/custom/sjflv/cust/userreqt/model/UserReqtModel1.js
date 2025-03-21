Ext.define('module.custom.sjflv.cust.userreqt.model.UserReqtModel1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'user_name'		, type: 'string'	// 사용자명
		},{	name: 'sign_reqt_date'	, type: 'string'	// 가입요청일자
			, convert : Ext.util.Format.strToDate
			, serialize: Ext.util.Format.dateToStr
		},{	name: 'hdph_numb'		, type: 'string'	// 휴대폰번호
		},{	name: 'cstm_idcd'		, type: 'string'	// 거래처ID
		},{	name: 'cstm_name'		, type: 'string'	// 거래처명
		},{	name: 'mail_addr'		, type: 'string'	// 이메일주소
		},{	name: 'line_stat'		, type: 'string'	// 상태
		}
	],
});
