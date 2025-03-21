Ext.define('module.custom.iypkg.prod.workentry2.view.WorkEntry2DetailFabc', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry2-detail-fabc',
	store		: 'module.custom.iypkg.prod.workentry2.store.WorkEntry2DetailFabc',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],
	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'dvcd'			, text : Language.get(''		,'구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('offr_path_dvcd')
					},{ dataIndex: 'fabc_name'		, text : Language.get(''		,'원단명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'ppln_dvcd'		, text : Language.get(''		,'골'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{ dataIndex: 'item_leng'		, text : Language.get(''		,'장'		) , width :  60 , align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'item_widh'		, text : Language.get(''		,'폭'		) , width :  60 , align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'item_fxqt'		, text : Language.get(''		,'절수'		) , width :  60 , align : 'right'
					},{ dataIndex: 'fdat_spec'		, text : Language.get(''		,'재단규격'		) , width : 150 , align : 'left'
					},{ dataIndex: 'need_qntt'		, text : Language.get(''		,'수량'		) , width :  60 , align : 'right', xtype : 'numericcolumn',
					},{ dataIndex: 'cstm_name'		, text : Language.get(''		,'매입처명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'invc_date'		, text : Language.get(''		,'일자'		) , width : 100 , align : 'center'
					}
				]
			}
		;
		return item;
	}
});