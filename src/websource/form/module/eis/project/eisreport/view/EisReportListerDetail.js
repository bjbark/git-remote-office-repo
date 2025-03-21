Ext.define('module.eis.project.eisreport.view.EisReportListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-lister-detail',
	store		: 'module.eis.project.eisreport.store.EisReportDetail',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.tbar = me.dockItem();
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},
	dockItem : function () {
		var me = this,
		item = {
				height: 48,
				xtype	: 'panel',
				layout	: 'border',
				id		: 'eisDetailDock',
				items	: [
					{	xtype	:'label',
						text	: '　',
						flex	: 1,
						region	: 'west',
						style	: 'background-color:white !important;',
					},{	xtype	:'label',
						text	: '　',
						flex	: 1,
						region	: 'east',
						style	: 'background-color:white !important;',
					},
					{	layout	: 'hbox',
						region	: 'center',
						flex	: 2,
						id		: 'eisDetailLookup',
						minWidth	: 600,
						items	: [
							{	xtype		: 'lookupfield',
								name		: 'ordr_dvcd',
								width		: 200,
								margin		: '0 60 0 0',
								height		: 43,
								lookupValue	: [["1","품질육성"],["2","대기"]],
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								value		: '1',
								editable	: false,
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
								listeners	: {
									change	: function(ob,val,reVal){
										me.getStore().load({
											 params:{param:JSON.stringify({work_ordr_dvcd : val})}, scope:me,
											 callback:function(records, operation, success) {
											}
										});
									}
								}
							},{	xtype	: 'label',
								text	: '진행 현황',
								margin		: '0 0 0 0',
								style	: 'font-size:3em !important;background-color:white !important;'
							},
						]
					},

				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{	dataIndex: 'work_stat_name'	, text : Language.get('work_stat_name'	,'상황')		, width : 100  , align : 'center',
						renderer:function(value,b,c,d,e){
							var a = value.split(':');

							b.style = "background-color:"+a[1]+";color:white"
							return a[0];
						}
					},{ dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'구분')			, width : 120 , align : 'center', xtype : 'lookupcolumn', lookupValue :resource.lookup('work_ordr_dvcd'),align:'center'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호')		, width : 120 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('acpt_case_name'	,'금형명')		, flex:1
					},{ dataIndex: 'work_item_name'	, text : Language.get('work_item_name'	,'부품명')		, width : 300,hidden:true
					},{ dataIndex: 'prjt_dvcd'		, text : Language.get('prjt_dvcd'		,'고객명')		, width : 160,hidden:true
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'MODEL')		, width : 160,hidden:true
					},{ dataIndex: 'cofm_date'		, text : Language.get('cofm_date'		,'수주일')		, width : 160 , align:'center',hidden:true
					},{ dataIndex: 'ppsl_deli_date'	, text : Language.get('ppsl_deli_date'	,'요청납기일')	, width : 160 , align:'center',hidden:true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일')		, width : 120 , align:'center'
					},{ dataIndex: 'ordr_degr'		, text : Language.get('ordr_degr'		,'차수')			, width : 80,align:'center', hidden:false
					}
				]
			}
		;
		return item;
	}
});
