Ext.define('module.custom.sjflv.mtrl.isttcalc.dailypurclist2.view.DailyPurcList2Lister4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dailypurclist2-lister4',
	store		: 'module.custom.sjflv.mtrl.isttcalc.dailypurclist2.store.DailyPurcList2Lister4',
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
	viewConfig: {
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');
					for(var j = 0; j < cells.length; j++) {
						if(record.get('trns_type')=='3'){	// 반품인 경우
							Ext.fly(cells[j]).setStyle('background-color', '#CBFFC8');
						}
						if(record.get('trns_type')=='2'){	// 반품인 경우
							Ext.fly(cells[j]).setStyle('background-color', 'Yellow');
						}
					}
				}
			}
		},
		getRowClass : function ( record , index ) {
			if(record.get('ostt_type') == '4'){
				return 'text-blue';
			}
		}
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				pagingButton : false,
				items	: [
					'-', '->', '-',
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'cstm_code'	, text : Language.get('cstm_code'	,'거래처코드'		) , width : 90 , align : 'center'
					},{	dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		) , width : 200 , align : 'left'
					},{	dataIndex: 'istt_type'	, text : Language.get(''	,'구분'		) , width : 65  , align : 'center', xtype : 'lookupcolumn', lookupValue : [['1','입고'],['2','이월'],['3','반품'],['4','소계'],['5','합계']],
					},{	dataIndex: '1_month'	, text : Language.get(''	,'1월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '2_month'	, text : Language.get(''	,'2월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '3_month'	, text : Language.get(''	,'3월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '4_month'	, text : Language.get(''	,'4월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '5_month'	, text : Language.get(''	,'5월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '6_month'	, text : Language.get(''	,'6월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '7_month'	, text : Language.get(''	,'7월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '8_month'	, text : Language.get(''	,'8월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '9_month'	, text : Language.get(''	,'9월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '10_month'	, text : Language.get(''	,'10월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '11_month'	, text : Language.get(''	,'11월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: '12_month'	, text : Language.get(''	,'12월'		) , width : 95  , align : 'right',  xtype : 'numericcolumn'
					},{	dataIndex: 'sum'		, text : Language.get(''	,'합계'		) , width : 105 , align : 'right',  xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
});