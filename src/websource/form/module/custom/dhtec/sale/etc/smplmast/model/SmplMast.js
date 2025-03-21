Ext.define('module.custom.dhtec.sale.etc.smplmast.model.SmplMast',{ extend:'Axt.data.Model',
	 fields:
	[
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'amnd_degr',				type: 'float'},			//AMD차수
		{name: 'invc_date',				type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},	/*INVOICE일자*/
		{name: 'bzpl_idcd',				type: 'string'},		//사업장ID
		{name: 'drtr_idcd',				type: 'string'},		//담당자ID
		{name: 'cstm_idcd',				type: 'string'},		//거래처ID
		{name: 'cstm_code',				type: 'string'},		//거래처코드
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'smpl_usge_dvcd',		type: 'string'},		//샘플용도구분코드
		{name: 'cstm_drtr_name',		type: 'string'},		//거래처담당자명
		{name: 'drtr_name',				type: 'string'},		//담당자명
		{name: 'bzpl_name',				type: 'string'},		//사업자명
		{name: 'post_code',				type: 'string'},		//우편번호
		{name: 'addr_1fst',				type: 'string'},		//주소1
		{name: 'addr_2snd',				type: 'string'},		//주소2
		{name: 'tele_numb',				type: 'string'},		//전화번호
		{name: 'reqt_memo',				type: 'string'},		//요청메모
		{name: 'regi_item_yorn',		type: 'string'},		//등록품목여부
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_code',				type: 'string'},		//품목코드
		{name: 'item_name',				type: 'string'},		//품목명
		{name: 'item_spec',				type: 'string'},		//품목규격
		{name: 'item_memo',				type: 'string'},		//품목메모
		{name: 'reqt_qntt',				type: 'float'},			//요청수량
		{name: 'reqt_unit',				type: 'string'},		//요청단위
		{name: 'npay_yorn',				type: 'string'},		//무상여부
		{name: 'sply_amnt',				type: 'float'},			//공급가액
		{name: 'vatx_amnt',				type: 'float'},			//부가세액
		{name: 'ttsm_amnt',				type: 'float'},			//합계금액
		{name: 'deli_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,},		//납기일자
		{name: 'ostt_schd_date',		type: 'string'},		//출고예정일자
		{name: 'prod_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,},		//생산일자
		{name: 'prod_drtr_idcd',		type: 'string'},		//생산담당자ID
		{name: 'prod_qntt',				type: 'float'},			//생산수량
		{name: 'prod_unit',				type: 'string'},		//생산단위
		{name: 'ostt_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,},		//출고일자
		{name: 'ostt_drtr_idcd',		type: 'string'},		//출고담당자ID
		{name: 'ostt_drtr_name',		type: 'string'},		//출고담당자
		{name: 'ostt_qntt',				type: 'float'},			//출고수량
		{name: 'ostt_amnt',				type: 'float'},			//출고금액
		{name: 'ostt_vatx',				type: 'float'},			//출고부가세
		{name: 'ostt_smam',				type: 'float'},			//합계금액
		{name: 'ostt_unit',				type: 'string'},		//출고단위
		{name: 'smpl_stat_dvcd',		type: 'string'},		//샘플상태구분코드
		{name: 'labr_drtr_idcd',		type: 'string'},		//실험담당자
		{name: 'labr_drtr_name',		type: 'string'},		//실험담당자명

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float', defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',				type: 'float', defaultValue : 0},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
