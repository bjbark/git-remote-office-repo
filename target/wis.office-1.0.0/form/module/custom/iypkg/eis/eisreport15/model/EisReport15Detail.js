Ext.define('module.custom.iypkg.eis.eisreport15.model.EisReport15Detail',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'wkct_idcd'			, type: 'string'		//공정ID
		},{	name: 'rnum'				, type: 'string'		//월
		},{	name: 'amnt'				, type: 'float'			//금액
		},{	name: 'prod_qntt'			, type: 'float'			//수량
		}
	]
});
