Ext.define('module.eis.project.eisreport.view.EisReportListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-lister-master',
	store		: 'module.eis.project.eisreport.store.EisReportMaster',
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

	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
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
				height: 50,
				xtype	: 'panel',
				style	: 'text-align:center;background-color: skyblue;',
				items	: [
					{	xtype	: 'label',
						text	: '신작 수주 진행 현황',
						style	: 'font-size:3em !important;'
					}
				]
			};
		return item ;
	},
	columnItem : function () {
		var me = this,
			item = {
				region	: 'center',
				cls		: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{	dataIndex: 'work_stat_name'	, text : Language.get('work_stat_name'	,'상황')		, width : 100  , align : 'center',
						renderer:function(value,b,c,d,e){
							var a = value.split(':');

							b.style = "background-color:"+a[1]+";color:white"
							return a[0];
						}
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호')	, width : 120 , align : 'center'
//					},{ dataIndex: 'work_item_name'	, text : Language.get('work_item_name'	,'부품명')		, width : 300
					},{ dataIndex: 'item_name'		, text : Language.get('acpt_case_name'	,'금형명')		, flex:1
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처')		, width : 160 ,hidden:true
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'MODEL')	, width : 180 ,hidden:true
					},{ dataIndex: 'regi_date'		, text : Language.get('regi_date'		,'수주일')		, width : 160,align:'center',hidden:true
					},{ dataIndex: 'ppsl_deli_date'	, text : Language.get('ppsl_deli_date'	,'요청납기일')	, width : 160,align:'center',hidden:true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일')		, width : 120,align:'center'
					},{ dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,''	)		, width : 120,align:'center', hidden:true
					},{ dataIndex: 'ordr_degr'		, text : Language.get('ordr_degr'		,'차수')		, width : 80,align:'center', hidden:false
					}
				]
			}
		;
		return item;
	}
});
