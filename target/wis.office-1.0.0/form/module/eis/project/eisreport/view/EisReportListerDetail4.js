Ext.define('module.eis.project.eisreport.view.EisReportListerDetail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport-lister-detail4',
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
						id		: 'label3',
						text	: '가공 대기 부품',
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
					{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'	,'금형번호')	, width : 120 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'	,'설비명')	,width : 200   , minwidth : 260
					},{ dataIndex: 'edtm'		, text : Language.get('edtm'	,'계획일')	,width : 140   , minwidth : 260, align:'center',
						renderer:function(val){
							var text = val.substr(0,10);
							return text;
						}
					}
				]
			}
		;
		return item;
	}
});
