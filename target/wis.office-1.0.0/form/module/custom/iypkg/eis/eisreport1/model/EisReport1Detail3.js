Ext.define('module.custom.iypkg.eis.eisreport1.model.EisReport1Detail3',{ extend:'Axt.data.Model',
	fields: [
		{name: 'loss_resn_dvcd',		type: 'string' },		//유실코드
		{name: 'loss_name',				type: 'string' },		//유실명
		{name: 'invc_numb',				type: 'string' },		//원자재명
		{name: 'item',				type: 'string' },		//원자재명
		{name: 'invc_date',				type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},//일자
		{name: 'fabc_name',				type: 'string' },		//원자재명
		{name: 'item_spec',				type: 'string' },		//규격
		{name: 'item_fxqt',				type: 'string' },		//절수
		{name: 'ppln_dvcd',				type: 'string' },		//평량/골
		{name: 'make_cmpy_name',		type: 'string' },		//매입처
		{name: 'pqty_pric',				type: 'float' },		//유실명
		{name: 'stnd_pric',				type: 'float' },		//단가
		{name: 'istt_qntt',				type: 'float' },		//수량
		{name: 'ttsm_amnt',				type: 'float' },		//공급가
		{name: 'istt_pric',				type: 'float' },		//단가
		{name: 'remk_text',				type: 'string' },		//비고
		{name: 'sttm',					type: 'string' , convert : Ext.util.Format.strToTime},		//유실시작시간
		{name: 'edtm',					type: 'string' , convert : Ext.util.Format.strToTime},		//유실종료시간
		{name: 'loss_time',				type: 'float'},		//유실시간

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
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
		{name: 'crte_dttm',				type: 'string' , convert : Ext.util.Format.strToDateTime},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
