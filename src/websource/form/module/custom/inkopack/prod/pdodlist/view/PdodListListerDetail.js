Ext.define('module.custom.inkopack.prod.pdodlist.view.PdodListListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-pdodlist-lister-detail',
	store		: 'module.custom.inkopack.prod.pdodlist.store.PdodListDetail',
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
				style	: 'text-align:center;background-color: skyblue;',
				items	: [
					{	xtype	: 'label',
						text	: '다 음 ( N E X T )',
						style	: 'font-size:3em !important;'
					}
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: 'Eisgrid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{	dataIndex: 'cvic_stnm'		, text : Language.get(''				,'설비'		)	, width : 80   , align  : 'center',
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		)	, width : 300
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		)	, width : 200  , align  : 'center',
					},{ dataIndex: 'indn_qntt'		, text : Language.get(''				,'작업량'	)	, width : 120  , xtype  : 'numericcolumn',
					},{ dataIndex: 'cstm_name'		, text : Language.get(''				,'가공규격'	)	, flex  : 1    , align  : 'center',
					}
				]
			}
		;
		return item;
	}
});
