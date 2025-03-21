Ext.define('module.custom.iypkg.eis.eisreport11.model.EisReportChart112',{ extend:'Axt.data.Model',
	fields : [
			{	name: 'cstm_idcd',			type: 'string' },		//거래처ID
			{	name: 'cstm_name',			type: 'string' },		//거래처명(상호)

//			{	name: 'january',			type: 'float' },		//1월
//			{	name: 'february',			type: 'float' },		//2월
//			{	name: 'march',				type: 'float' },		//3월
//			{	name: 'april',				type: 'float' },		//4월
//			{	name: 'may',				type: 'float' },		//5월
//			{	name: 'jun',				type: 'float' },		//6월
//			{	name: 'july',				type: 'float' },		//7월
//			{	name: 'august',				type: 'float' },		//8월
//			{	name: 'september',			type: 'float' },		//9월
//			{	name: 'october',			type: 'float' },		//10월
//			{	name: 'novemeber',			type: 'float' },		//11월
//			{	name: 'december',			type: 'float' },		//12월

			{	name: 'mm',					type: 'string'  },		// 1~12월
			{	name: 'istt_amnt',			type: 'float'  },		//sw + dw 합계
	]
});
