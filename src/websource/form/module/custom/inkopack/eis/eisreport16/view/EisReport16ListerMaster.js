Ext.define('module.custom.inkopack.eis.eisreport16.view.EisReport16ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-eisreport16-lister-master',
	store		: 'module.custom.inkopack.eis.eisreport16.store.EisReport16Master',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return "Eiscell";
		}
	},
	initComponent: function () {
		var me = this;
		/*me.tbar = me.dockItem();*/
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
	/*dockItem : function () {
		var me = this,
		item = {
				height: 50,
				xtype	: 'panel',
				style	: 'text-align:center;background-color: skyblue;',
				items	: [
					{	xtype	: 'label',
						text	: '종합 현황',
						style	: 'font-size:3em !important;'
					}
				]
			};
		return item ;
	},*/
	columnItem : function () {
		var me = this,
			item = {
				region	: 'center',
				cls		: 'Eisgrid',
				defaults: {style: 'text-align: center;font-size:6em !important;'},
				items	: [
					{	xtype: 'rownumberer'		, width:70	, text : 'NO',hidden:true
					},{ dataIndex: 'deli_date'		, width: 135, align: 'center', text: Language.get(''		,'년/월'			)
					},{ dataIndex: 'cstm_name'		, flex :   2, align: 'left'  , text: Language.get(''		,'업체'			)
					},{ dataIndex: 'item_name'		, flex :   2, align: 'left'  , text: Language.get(''		,'제품명'		)
					},{ dataIndex: 'item_spec'		, width: 200, align: 'center', text: Language.get(''		,'규격'			)
					},{ dataIndex: 'chk1'			, width:  55, align: 'center', text: Language.get(''		,'자재<br>입고'		),
						renderer : function(value, meta) {
						    if(parseInt(value) > 0) {
						        meta.style = "background-color:yellow;";
						    }
						    return "";
						}
					},{ dataIndex: 'chk2'			, width:  55, align: 'center', text: Language.get(''		,'인쇄'			),
						renderer : function(value, meta) {
						    if(parseInt(value) > 0) {
						        meta.style = "background-color:yellow;";
						    }
						    return "";
						}
					},{ dataIndex: 'chk3'			, width:  55, align: 'center', text: Language.get(''		,'합지'			),
						renderer : function(value, meta) {
						    if(parseInt(value) > 0) {
						        meta.style = "background-color:yellow;";
						    }
						    return "";
						}
					},{ dataIndex: 'chk4'			, width:  55, align: 'center', text: Language.get(''		,'가공'			),
						renderer : function(value, meta) {
						    if(parseInt(value) > 0) {
						        meta.style = "background-color:yellow;";
						    }
						    return "";
						}
					},{ dataIndex: 'chk5'			, width:  55, align: 'center', text: Language.get(''		,'창고<br>입고'		),
						renderer : function(value, meta) {
						    if(parseInt(value) > 0) {
						        meta.style = "background-color:yellow;";
						    }
						    return "";
						}
					},{ dataIndex: 'chk6'			, width:  55, align: 'center', text: Language.get(''		,'출고'			),
						renderer : function(value, meta) {
						    if(parseInt(value) > 0) {
						        meta.style = "background-color:yellow;";
						    }
						    return "";
						}
					}
				]
			}
		;
		return item;
	}
});
