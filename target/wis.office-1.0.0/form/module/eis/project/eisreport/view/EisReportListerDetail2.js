Ext.define('module.eis.project.eisreport.view.EisReportListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-lister-detail2',
	store		: 'module.eis.project.eisreport.store.EisReportDetail2',
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
						id	: 'label1',
						text	: '대기 부품',
						style	: 'font-size:3em !important;'
					}
				]
			};
		return item ;
	},
	columnItem : function () {
		var me = this;
		var item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호')		,width : 120, align : 'center'
					},{ dataIndex: 'work_cont'		, text : Language.get('work_cont'		,'부품명')		, flex:1
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'공정명')		,flex:1
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'현재상태')		,width : 100 , xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","진행중"],["2","지연"]], align : 'center'
					},{ dataIndex: 'edtm'			, text : Language.get('edtm'			,'예상완료')		,width : 120, align : 'center',
						renderer:function(val){
							var text = val.substr(0,10);
							return text;
						}
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'보관처')		,flex:1
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		,flex:1, minWidth : 120,hidden:true
					}
				]
			}
		;
		return item;
	}
});
