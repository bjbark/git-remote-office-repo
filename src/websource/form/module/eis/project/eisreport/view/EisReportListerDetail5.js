Ext.define('module.eis.project.eisreport.view.EisReportListerDetail5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-lister-detail5',
	store		: 'module.eis.project.eisreport.store.EisReportDetail3',
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
				height: 50,
				xtype	: 'panel',
				style	: 'text-align:center;',
				items	: [
					{	xtype	: 'label',
						id		: 'label4',
						text	: '진행 부품',
						style	: 'font-size:3em !important;'
					}
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
					{	dataIndex: 'pjod_idcd'	, text : Language.get('pjod_idcd'	,'금형번호'	)	, width : 120 , align : 'center'
					},{ dataIndex: 'it_name'	, text : Language.get('it_name'		,'부품명'		)	, flex  : 1,
					},{	dataIndex: 'item_name'	, text : Language.get('item_name'	,'공정명'		)	, flex  : 1
					},{	dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비명'		)	, flex  : 1
					},{ dataIndex: 'invc_date'	, text : Language.get('strt_aday'	,'시작일'		)	, width : 160 , align : 'center',
					},{ dataIndex: 'work_sttm'	, text : Language.get('strt_time'	,'시작시간'	)	, width : 80 , align : 'center',
					},{ dataIndex: 'user_name'	, text : Language.get('wker'		,'작업자'		)	, width : 100
					},{ dataIndex: 'deli_date'	, text : Language.get('deli_date'	,'납기일자'	)	, flex:1, minWidth : 120,hidden:true
					}
				]
			}
		;
		return item;
	}
});
