Ext.define('module.custom.hjsys.sale.order.slorlist1.view.SlorList1Detail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-slorlist1-lister-detail2',
	store		: 'module.custom.hjsys.sale.order.slorlist1.store.SlorList1Detail2'	,

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
						//글씨색
						if(record.data.wkct == '자사/외주') {
							Ext.fly(cells[j]).setStyle('color', 'black');
						}else if(record.data.wkct == '지시수량') {
							Ext.fly(cells[j]).setStyle('color', '#0000CD');
						}else if(record.data.wkct == '불량수량') {
							Ext.fly(cells[j]).setStyle('color', '#DC143C');
						}else if(record.data.wkct == '양품수량') {
							Ext.fly(cells[j]).setStyle('color', '#1c751c');
						}else if(record.data.wkct == '작업자') {
							Ext.fly(cells[j]).setStyle('color', 'black');
						}
					}

				}
			}
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'line_seqn'		, text: Language.get('line_seqn'		, '순번'				), width: 35 , align : 'center',hidden : true
					},{	dataIndex:	'drwg_numb'		, text: Language.get('drwg_numb'		, '도번'				), width: 120 , align : 'left', hidden : true
					},{	dataIndex:	'revs_numb'		, text: Language.get('revs_numb'		, 'Rev'				), width:  50 , align : 'left', hidden : true
					},{	dataIndex:	'item_name'		, text: Language.get('item_name'		, '품명'				), width: 200 , align : 'left', hidden : true
					},{	dataIndex:	'invc_qntt'		, text: Language.get('invc_qntt'		, '품목수주량'		), width: 80  , xtype: 'numericcolumn', hidden : true
					},{	dataIndex:	'item_idcd'		, text: Language.get('item_idcd'		, '품목ID'			), hidden : true
					},{	dataIndex:	'amnd_degr'		, text: Language.get('amnd_degr'		, '차수'				), hidden : true
					},{	dataIndex:	'pdsd_yorn'		, text: Language.get('pdsd_yorn'		, '생산계획여부'		), hidden : true
					},{	dataIndex:	'check'			, text: Language.get('check'			, '생산계획등록여부'	), hidden : true
					},{	dataIndex:	'invc_numb'		, text: Language.get('invc_numb'		, '수주번호'			), hidden : true
					},{	dataIndex:	'drwg_chk'		, text: Language.get('drwg_chk'			, '도면등록여부'		), hidden : true
					},{	dataIndex:	'chk'			, text: Language.get('chk'				, 'chk'				), hidden : true
					},{	dataIndex:	'drChk'			, text: Language.get('drChk'			, '도면등록여부체크'	), hidden : true
					},{	dataIndex:	'wkct'			, text: Language.get('wkct'				, '구분'				), width: 80 , align : 'center',
					},{ dataIndex: 'wkct_1'				, text : Language.get('wkct_1','설계'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_2'				, text : Language.get('wkct_2','NCT'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_3'				, text : Language.get('wkct_3','LASER'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_4'				, text : Language.get('wkct_4','사상'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_5'				, text : Language.get('wkct_5','드릴'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_6'				, text : Language.get('wkct_6','C/S'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_7'				, text : Language.get('wkct_7','TAP'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_8'				, text : Language.get('wkct_8','절곡1'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_9'				, text : Language.get('wkct_9','절곡2'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_10'			, text : Language.get('wkct_10','용접'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_11'			, text : Language.get('wkct_11','외주가공'		) , width : 75  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_12'			, text : Language.get('wkct_12','도금'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_13'			, text : Language.get('wkct_13','도장'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_14'			, text : Language.get('wkct_14','폴리싱'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_15'			, text : Language.get('wkct_15','전해연마'		) , width : 75  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_16'			, text : Language.get('wkct_16','인쇄'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_17'			, text : Language.get('wkct_17','조립'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_18'			, text : Language.get('wkct_18','세척'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_19'			, text : Language.get('wkct_19','검사'			) , width : 70  , align : 'right', sortable:true
					},{ dataIndex: 'wkct_20'			, text : Language.get('wkct_20','납품'			) , width : 70  , align : 'right', sortable:true
					}
				]
			}
		;
		return item;
	}
});