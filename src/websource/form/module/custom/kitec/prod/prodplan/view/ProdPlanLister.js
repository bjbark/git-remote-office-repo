Ext.define('module.custom.kitec.prod.prodplan.view.ProdPlanLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodplan-lister',
	store		: 'module.custom.kitec.prod.prodplan.store.ProdPlan',
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 }, { ptype:'filterbar'}],

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(record){
			if(record.get('line_seqn') == '0'){
				return "hideCls";
			}
		},
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	listeners:{
		render : function(){
			var me = this,
				search = Ext.ComponentQuery.query('module-prodplan-search')[0],
				param = search.getValues()
			;
			me.select({
				callback:function(records, operation, success) {
				if (success) {
				} else {}
				}
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		},
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
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
					{	xtype	: 'button',
						iconCls	: 'filterIcon',
						toggleGroup:'onoff',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						}
					},
					'->', '-' ,
					{	text: Const.INSERT.text , iconCls: Const.INSERT.icon , action : Const.INSERT.action ,cls: 'button-style' },
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'cvic'		, text : Language.get(''		,'호기'		) , width : 100 , align : 'center'
					},{	dataIndex: 'dvcd'		, text : Language.get(''		,'구분'		) , width : 100 , align : 'center'
					},{	dataIndex: 'day1'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day1]').setText(record.data.day1);
							}
							return value;
						}
					},{	dataIndex: 'day2'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day2]').setText(record.data.day2);
							}
							return value;
						}
					},{	dataIndex: 'day3'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day3]').setText(record.data.day3);
							}
							return value;
						}
					},{	dataIndex: 'day4'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day4]').setText(record.data.day4);
							}
							return value;
						}
					},{	dataIndex: 'day5'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day5]').setText(record.data.day5);
							}
							return value;
						}
					},{	dataIndex: 'day6'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day6]').setText(record.data.day6);
							}
							return value;
						}
					},{	dataIndex: 'day7'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day7]').setText(record.data.day7);
							}
							return value;
						}
					},{	dataIndex: 'day8'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day8]').setText(record.data.day8);
							}
							return value;
						}
					},{	dataIndex: 'day9'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day9]').setText(record.data.day9);
							}
							return value;
						}
					},{	dataIndex: 'day10'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day10]').setText(record.data.day10);
							}
							return value;
						}
					},{	dataIndex: 'day11'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day11]').setText(record.data.day11);
							}
							return value;
						}
					},{	dataIndex: 'day12'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day12]').setText(record.data.day12);
							}
							return value;
						}
					},{	dataIndex: 'day13'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day13]').setText(record.data.day13);
							}
							return value;
						}
					},{	dataIndex: 'day14'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day14]').setText(record.data.day14);
							}
							return value;
						}
					},{	dataIndex: 'day15'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day15]').setText(record.data.day15);
							}
							return value;
						}
					},{	dataIndex: 'day16'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day16]').setText(record.data.day16);
							}
							return value;
						}
					},{	dataIndex: 'day17'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day17]').setText(record.data.day17);
							}
							return value;
						}
					},{	dataIndex: 'day18'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day18]').setText(record.data.day18);
							}
							return value;
						}
					},{	dataIndex: 'day19'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day19]').setText(record.data.day19);
							}
							return value;
						}
					},{	dataIndex: 'day20'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day20]').setText(record.data.day20);
							}
							return value;
						}
					},{	dataIndex: 'day21'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day21]').setText(record.data.day21);
							}
							return value;
						}
					},{	dataIndex: 'day22'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day22]').setText(record.data.day22);
							}
							return value;
						}
					},{	dataIndex: 'day23'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day23]').setText(record.data.day23);
							}
							return value;
						}
					},{	dataIndex: 'day24'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day24]').setText(record.data.day24);
							}
							return value;
						}
					},{	dataIndex: 'day25'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day25]').setText(record.data.day25);
							}
							return value;
						}
					},{	dataIndex: 'day26'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day26]').setText(record.data.day26);
							}
							return value;
						}
					},{	dataIndex: 'day27'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day27]').setText(record.data.day27);
							}
							return value;
						}
					},{	dataIndex: 'day28'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day28]').setText(record.data.day28);
							}
							return value;
						}
					},{	dataIndex: 'day29'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day29]').setText(record.data.day29);
							}
							return value;
						}
					},{	dataIndex: 'day30'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day30]').setText(record.data.day30);
							}
							return value;
						}
					},{	dataIndex: 'day31'		, text : Language.get(''		,''		) , width : 100 , align : 'center',
						renderer: function(value, meta, record){
							if(record.get('line_seqn') == '0'){
								me.down('[dataIndex=day31]').setText(record.data.day31);
							}
							return value;
						}
					}
				]
			}
		return item;
	}

});
