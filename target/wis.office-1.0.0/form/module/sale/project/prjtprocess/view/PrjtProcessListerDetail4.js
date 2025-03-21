Ext.define('module.sale.project.prjtprocess.view.PrjtProcessListerDetail4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtprocess-lister-detail4',
	store		: 'module.sale.project.prjtprocess.store.PrjtProcessDetail1',
	plugins       : [{ ptype  :'cellediting-directinput', clicksToEdit: 1 } ,{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,

			item = {
				itemId : 'sub',
				defaults: {style: 'text-align: center'},
				items : [
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 500	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		, '순서'		)	, width :  40	, align : 'center', xtype : 'numericcolumn'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		, '투입품명'	)	, width : 200	, hidden : true
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		, '품목규격'	)	, width : 130
					},{ dataIndex: 'supl_dvcd'		, text : Language.get('supl_dvcd'		, '조달구분'	)	, width :  90
					},{ dataIndex: 'ivst_wkct_name'	, text : Language.get('ivst_wkct_name'	, '투입공정'	)	, width : 130
					},{ dataIndex: 'need_qntt'		, text : Language.get('need_qntt'		, '소요량'		)	, width :  85	, xtype : 'numericcolumn'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		, '구매처'		)	, width : 130
					},{ dataIndex: 'istt_date'		, text : Language.get('istt_date'		, '입고일자'	)	, width :  90
					},{ dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		, '입고량'		)	, width :  85	, xtype : 'numericcolumn'
					},{ dataIndex: 'istt_amnt'		, text : Language.get('istt_amnt'		, '입고금액'	)	, width :  85	, xtype : 'numericcolumn'
					},{ dataIndex: 'used_qntt'		, text : Language.get('used_qntt'		, '사용량'		)	, width :  85	, xtype : 'numericcolumn'
					},{ dataIndex: 'incm_loss_rate'	, text : Language.get('incm_loss_rate'	, '사내LOSS율'	)	, width :  80	, xtype : 'numericcolumn'
					},{ dataIndex: 'otcm_loss_rate'	, text : Language.get('otcm_loss_rate'	, '외주LOSS율'	)	, width :  80	, xtype : 'numericcolumn'
					},{	dataIndex: 'regi_date'		, text : Language.get('regi_date'		, '등록일자'	)	, width :  80
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		, '메모'		)	, flex  : 1
					}
				]
			}
		;
		return item;
	}
});