Ext.define('module.qc.anal.insplist2.model.InspList2Lister4', { extend: 'Axt.data.Model',
	fields:
		[
			{	name: 'invc_numb',			type: 'string' },		//INVOICE번호
			{	name: 'wkct_code',			type: 'string' },		//공정코드
			{	name: 'wkct_idcd',			type: 'string' },		//공정ID
			{	name: 'wkct_name',			type: 'string' },		//공정명
			{	name: 'poor_name',			type: 'string' },		//불량구분
			{	name: 'poor_qntt',			type: 'float'  },		//불량수량
			{	name: 'cnfm_drtr_idcd',		type: 'string' },		//확인담당자ID
			{	name: 'cnfm_drtr_name',		type: 'string' }		//확인담당자명
		]
});