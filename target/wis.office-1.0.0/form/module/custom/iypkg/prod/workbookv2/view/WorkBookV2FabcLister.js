Ext.define('module.custom.iypkg.prod.workbookv2.view.WorkBookV2FabcLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv2-fabc-lister'			,
	store		: 'module.custom.iypkg.prod.workbookv2.store.WorkBookV2FabcLister',
	border		: 0,

	columnLines : false,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.columns = me.columnItem();
		me.callParent();
	},



	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:1.5em !important;'},
				items : [
					{	dataIndex: ''	, text : Language.get(''	,'구분'		) , width : 80  , xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","시작"],["2","중단"],["3","완료"]], align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'매입처'	) , minWidth : 200 , flex:1
					},{ dataIndex: 'fabc_name'		, text : Language.get('fabc_name'		,'원단명'	) , minWidth : 155 , flex:1
					},{ dataIndex: 'fabc_spec'		, text : Language.get('fabc_spec'		,'원단규격'	) , width : 155
					},{ dataIndex: ''		, text : Language.get(''		,'절수'		) , width : 80
					},{ dataIndex: ''		, text : Language.get('spec'		,'재단규격'	) , width : 155
					},{ dataIndex: 'need_qntt'		, text : Language.get('need_qntt'		,'필요량'	) , width : 100  , xtype : 'numericcolumn'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'작지량'	) , width : 100  , xtype : 'numericcolumn'
					},{ dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'재고량'	) , width : 100  , xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	},

});