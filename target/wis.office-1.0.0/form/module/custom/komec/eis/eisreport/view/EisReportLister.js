Ext.define('module.custom.komec.eis.eisreport.view.EisReportLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-komec-eisreport-lister',
	store		: 'module.custom.komec.eis.eisreport.store.EisReport',
	split		: true,
	selModel	: { selType: 'checkboxmodel',mode:'SINGLE'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent: function () {
		var rowIndexNum;
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
//				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls : _global.options.work_book_tema + 'grid',
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비'		) , width : 200,
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;';
							return value;
						},
					},{ dataIndex: 'pdod_date'		, text : Language.get('pror_date'		,'지시일자'	) , width : 140 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품목'		) , flex : 1 , minWidth : 100,
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width :  120 , xtype : 'numericcolumn', summaryType: 'sum',
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							return  Ext.util.Format.number(value,'0,000');
						},
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width :  100, align:'center',
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							var result = "";
							Ext.each(resource.lookup('prog_stat_dvcd'),function(rec){
								if(rec[0]==value){
									result = rec[1];
								}
							});

							return result;
						},
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산'		) , width :  120 , xtype : 'numericcolumn', summaryType: 'sum',
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							return Ext.util.Format.number(value,'0,000');
						},
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량'		) , width :  80 , xtype : 'numericcolumn', summaryType: 'sum',
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							return  Ext.util.Format.number(value,'0,000');
						},
					},{ dataIndex: 'gauge'			, text : Language.get('gauge'			,'달성률'		) , width :  80 , xtype : 'numericcolumn',
						renderer: function(value, meta){
							meta.style = 'font-size:2em !important;height:35px;line-height:35px;'; // applied style for DIV element
							return  Ext.util.Format.number(value,'0,000');
						},
					}
				]
			}
		;
		return item;
	},
});
