Ext.define('module.custom.sjflv.stock.isos.hdlidlvymast.model.HdliDlvyMast',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'invc_date',				type: 'string', serialize: Ext.util.Format.dateToStr, convert : Ext.util.Format.strToDate},		//INVOICE일자
		{name: 'dlvy_dinv_numb',		type: 'string'},		//배송송장번호
		{name: 'dlvy_rcpt_hmlf',		type: 'string'},		//배송수신인명
		{name: 'dlvy_zpcd',				type: 'string'},		//배송우편번호
		{name: 'dlvy_addr_1fst',		type: 'string'},		//배송주소1
		{name: 'dlvy_addr_2snd',		type: 'string'},		//배송주소2
		{name: 'dlvy_tele_numb',		type: 'string'},		//배송전화번호
		{name: 'dlvy_hdph_numb',		type: 'string'},		//배송휴대폰번호
		{name: 'dlvy_qntt',				type: 'float'},			//배송수량
		{name: 'dlvy_exps',				type: 'float'},			//배송비용
		{name: 'dlvy_date',				type: 'string'},		//배송일자
		{name: 'dlvy_brch_name',		type: 'string'},		//배송지점명
		{name: 'dlvy_memo',				type: 'string'},		//배송메모
		{name: 'hdli_dinv_qntt',		type: 'string'},		//택배송장수량

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
