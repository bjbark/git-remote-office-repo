Ext.define('lookup.popup.model.CstmPopup4',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'			, type: 'string' 	/* 거래처ID		*/
		},{	name: 'cstm_code'			, type: 'string' 	/* 거래처코드		*/
		},{	name: 'cstm_name'			, type: 'string' 	/* 고객명		*/
		},{	name: 'mail_addr'			, type: 'string' 	/* 이메일주소		*/
		},{	name: 'buss_numb'			, type: 'string' 	/* 사업자등록번호		*/
		},{	name: 'buss_name'			, type: 'string' 	/* 사업자등록번호		*/
		},{	name: 'boss_name'			, type: 'string' 	/* 대표자명		*/
		},{	name: 'tele_numb'			, type: 'string' 	/* 전화번호		*/
		},{	name: 'line_seqn'			, type: 'float'		// 순번
		},{	name: 'post_code'			, type: 'string'	// 우편번호
		},{	name: 'addr_1fst'			, type: 'string'	// 주소1
		}
	]
});