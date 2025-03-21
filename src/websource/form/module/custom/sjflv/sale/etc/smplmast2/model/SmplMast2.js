Ext.define('module.custom.sjflv.sale.etc.smplmast2.model.SmplMast2',{ extend:'Axt.data.Model',
	 fields:
	[
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'new_invc_numb',			type: 'string'},		//NEW INVOICE번호
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.dateToStr, serialize: Ext.util.Format.dateToStr},	/*INVOICE일자*/
		{name: 'cstm_name',				type: 'string'},		//거래처명
		{name: 'smpl_usge_dvcd',		type: 'string'},		//샘플용도구분코드
		{name: 'sale_drtr_name',		type: 'string'},		//영업담당자명
		{name: 'labr_drtr_name',		type: 'string'},		//연구담당자명
		{name: 'item_name',				type: 'string'},		//품목명
		{name: 'change',				type: 'string'},		//변경사항
		{name: 'smpl_dvcd',				type: 'string'},		//샘플구분코드
		{name: 'smpl_cls_code',			type: 'string'},	    //샘플분류코드
		{name: 'smpl_usge_dvcd',		type: 'string'},		//샘플용도구분코드
		{name: 'spec_1fst',				type: 'string'},		//규격1
		{name: 'spec_2snd',				type: 'string'},		//규격2
		{name: 'pcmt',					type: 'string'},		//특이사항
		{name: 'remk_text',				type: 'string'},		//비고
		{name: 'smpl_esti_cont',		type: 'string'},		//샘플견적내용
		{name: 'lott_numb',				type: 'string'},		//LOT번호
		{name: 'smpl_qntt_cont',		type: 'string'},		//샘플수량내용
		{name: 'smpl_clss_code',		type: 'string'},		//유형
		{name: 'smpl_clss_name',		type: 'string'},		//유형명

		{name: 'deli_date',				type: 'string', convert : Ext.util.Format.dateToStr, serialize: Ext.util.Format.dateToStr},			//전달일자
		{name: 'sply_amnt',				type: 'string'},		//공급가액
		{name: 'rslt_proc',				type: 'string'},		//결과처리
		{name: 'prog_memo',				type: 'string'},		//샘플진행
		{name: 'fema',					type: 'string'},		//fema
		{name: 'hala_cont',				type: 'string'},		//halal

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
