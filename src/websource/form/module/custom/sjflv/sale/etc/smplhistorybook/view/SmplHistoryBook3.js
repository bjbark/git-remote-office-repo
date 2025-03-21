Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.view.SmplHistoryBook3', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-sjflv-sale-etc-smplhistorybook-lister3',
	store		: 'module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook3',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,
	selModel : {
		selType: 'checkboxmodel',mode : 'MULTI'// 또는 MULTI
	},
	initComponent: function () {
		var me = this;
		me.dockedItems  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->',
					'-',
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style', hidden : (_global.auth.auth_down_excel_1001) ? false : true } // 23.10.05 - 엑셀다운 권한이 있는 경우  버튼 활성화
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{ dataIndex: 'ostt_drtr_name'		, text : Language.get('ostt_drtr_name'	, '배송자'			) , width : 100
					},{ dataIndex: 'ostt_qntt'			, text : Language.get('ostt_qntt'		, '샘플배송량'		) , width : 100 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', format: '#,##0'
					},{ dataIndex: 'cstm_drtr_name'		, text : Language.get('cstm_drtr_name'	, '담당영업사원'		) , width : 80
					},{ dataIndex: 'addr'				, text : Language.get('addr'			, '도착지'			) , width : 350
					}
				]
		}
		return item;
	},
});