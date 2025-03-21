Ext.define('module.custom.sjflv.prod.order.prodorder.model.ProdOrder1',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb',			type: 'string'},		//INVOICE번호
		{	name: 'bzpl_idcd',			type: 'string'},		//사업장ID
		{	name: 'pdod_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },		//생산지시일자
		{	name: 'acpt_numb',			type: 'string'},		//수주번호
		{	name: 'acpt_seqn',			type: 'float' },		//수주순번
		{	name: 'cstm_idcd',			type: 'string'},		//거래처ID
		{	name: 'cstm_name',			type: 'string'},		//거래처명
		{	name: 'pdsd_numb',			type: 'string'},		//생산계획번호
		{	name: 'pdsd_date',			type: 'string'},		//생산계획일자
		{	name: 'item_idcd',			type: 'string'},		//품목ID
		{	name: 'item_code',			type: 'string'},		//품목코드
		{	name: 'item_name',			type: 'string'},		//품명
		{	name: 'item_spec',			type: 'string'},		//규격
		{	name: 'wkfw_idcd',			type: 'string'},		//공정흐름ID
		{	name: 'bomt_degr',			type: 'float' },		//BOM차수
		{	name: 'unit_idcd',			type: 'string'},		//단위ID
		{	name: 'indn_qntt',			type: 'float' },		//지시수량
		{	name: 'prod_qntt',			type: 'float' },		//생산수량
		{	name: 'work_date',			type: 'string'},		//작업일자
		{	name: 'stnd_unit',			type: 'string'},		//기준단위
		{	name: 'stnd_unit_qntt',		type: 'float' },		//기준단위수량
		{	name: 'prod_bzpl_idcd',		type: 'string'},		//생산사업장ID
		{	name: 'prog_dvcd',			type: 'string'},		//진행구분코드
		{	name: 'remk_text',			type: 'string'},		//비고
		{	name: 'prog_stat_dvcd',		type: 'string'},		//진행상태
		{	name: 'work_strt_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//작업시작일시
		{	name: 'work_endd_dttm',		type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr},		//작업종료일시
		{	name: 'insp_wkct_yorn',		type: 'string'},		//검사공정여부
		{	name: 'qntt',				type: 'float'} ,			//지시수량
		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI

		{	name: 'deli_date',			type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },
		{	name: 'stok_used_qntt',		type: 'float' },		//생산구분
		{	name: 'plan_qntt',			type: 'float' },		//생산구분
		{	name: 'acpt_qntt',			type: 'float' },		//생산구분
		{	name: 'prod_trst_dvcd',		type: 'string'},		//생산구분
		{	name: 'stok_used',			type: 'string'},		//생산구분
		{	name: 'pckg_unit',			type: 'string'},		//생산구분
		{	name: 'labl_qntt',			type: 'float' },		//생산구분
		{	name: 'make_mthd',			type: 'string'},		//생산구분
		{	name: 'stok_asgn_qntt',		type: 'float' },		//생산구분
		{	name: 'cvic_idcd',			type: 'string'},		//생성ID
		{	name: 'cvic_name',			type: 'string'},		//생성UI
		{	name: 'plan_baln_qntt',		type: 'float' },		//계획잔량
		{	name: 'indn_qntt',			type: 'float' },		//계획잔량

		{	name: 'plan_sttm',			type: 'string'},
		{	name: 'plan_edtm',			type: 'string'},
		{	name: 'used_yorn',			type: 'string'},
		{	name: 'oem_yorn',			type: 'string'},
		{	name: 'bomt_degr',			type: 'string'},
	]
});
