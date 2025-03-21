Ext.define('module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr3-worker-detail',
	store		: 'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerDetail',

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
					'-', '->', '-',
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'fabc_name'	, text : Language.get('fabc_name'		,'원단명'		) , width : 230 , align : 'left'
					},{ dataIndex: 'ppln_dvcd'	, text : Language.get('ppln_dvcd'		,'골'		) , width : 60  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('ppln_dvcd'),
					},{ dataIndex: 'item_leng'	, text : Language.get('item_leng'		,'장'		) , width : 60  , align : 'right'	//품목장
					},{ dataIndex: 'item_widh'	, text : Language.get('item_widh'		,'폭'		) , width : 60  , align : 'right'	//품목폭
					},{ dataIndex: 'item_fxqt'	, text : Language.get('item_fxqt'		,'절수'		) , width : 60  , align : 'right'	//품목절수
					},{ dataIndex: 'need_qntt'	, text : Language.get('need_qntt'		,'수량'		) , width : 80  , align : 'right'
					},{ dataIndex: 'istt_yorn'	, text : Language.get('istt_yorn'		,'입고여부'		) , width : 60  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'		,'매입처명'		) , width : 230 , align : 'left'	//원단입고처
					},{ dataIndex: 'invc_date'	, text : Language.get('invc_date'		,'일자'		) , width : 100 , align : 'center'	//원단입고일자
					},{ dataIndex: ''			, text : Language.get(''				,'비고'		) , flex  : 1
					}
				]
			}
		;
		return item;
	}
});