Ext.define('module.custom.kitec.prod.prodplanv3.model.ProdPlanV3',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'plan_yymm',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  }, //계획년월
		{	name: 'item_name',			type: 'string'},	//품목명
		{	name: 'plan_degr',			type: 'int'  },		//계획차수
		{	name: 'lyer_avrg_pdsd_qntt',type: 'float'},		//전년평균생산계획수량
		{	name: 'avrg_pdsd_qntt_6mns',type: 'float'},		//평균생산계획수량6개월
		{	name: 'avrg_pdsd_qntt_3mns',type: 'float'},		//평균생산계획수량3개월
		{	name: 'bmon_avrg_pdsd_qntt',type: 'float'},		//전월평균생산계획수량
		{	name: 'bmon_pdsd_qntt',		type: 'float'},		//전월생간계획수량
		{	name: 'cumn_pdsd_qntt',		type: 'float'},		//당월생산계획수량
		{	name: 'slsd_3mnb',			type: 'float'},		//판매계획3개월전
		{	name: 'pdsd_3mnb',			type: 'float'},		//생산계획3개월전
		{	name: 'optm_stok_3mnb',		type: 'float'},		//적정재고3개월전
		{	name: 'emon_stok_3mnb',		type: 'float'},		//월말재고3개월전
		{	name: 'slsd_2mnb',			type: 'float'},		//판매게획2개월전
		{	name: 'pdsd_2mnb',			type: 'float'},		//생산계획2개월전
		{	name: 'optm_stok_2mnb',		type: 'float'},		//적정재고2개월전
		{	name: 'emon_stok_2mnb',		type: 'float'},		//월말재고2개월전
		{	name: 'slsd_1mnb',			type: 'float'},		//판매계획1개월전
		{	name: 'pdsd_1mnb',			type: 'float'},		//생산계획1개월전
		{	name: 'optm_stok_1mnb',		type: 'float'},		//적정재고1개월전
		{	name: 'emon_stok_1mnb',		type: 'float'},		//월말재고1개월전

		{	name: 'user_memo',			type: 'string'},	//사용자메모
		{	name: 'sysm_memo',			type: 'string'},	//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},	//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},	//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},	//ROW마감
		{	name: 'find_name',			type: 'string'},	//찾기명
		{	name: 'updt_user_name',		type: 'string'},	//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},	//수정IP
		{	name: 'updt_dttm',			type: 'string'},	//수정일시
		{	name: 'updt_idcd',			type: 'string'},	//수정ID
		{	name: 'updt_urif',			type: 'string'},	//수정UI
		{	name: 'crte_user_name',		type: 'string'},	//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},	//생성IP
		{	name: 'crte_dttm',			type: 'string'},	//생성일시
		{	name: 'crte_idcd',			type: 'string'},	//생성ID
		{	name: 'crte_urif',			type: 'string'},	//생성UI
	]
});
