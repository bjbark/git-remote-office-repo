Ext.define('module.custom.sjflv.item.bomlist.view.BomListLister3', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-sjflv-bomlist-lister3',
	store		: 'module.custom.sjflv.item.bomlist.store.BomListLister3',
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
					{ dataIndex: 'acct_name'		, text : Language.get('acct_name'	, '계정구분'			) , width : 80, align:'center'
					},{  dataIndex: 'item_code'			,text : Language.get('item_code','품목코드'		) , width : 160	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'	, '품명'			) , width : 200
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'	, '규격'			) , width : 130
					},{ dataIndex: 'mixx_rate'		, text : Language.get('mixx_rate'	, '배합비'		) , width : 60	, xtype : 'numericcolumn',
					},{ dataIndex: 'caca'			, text : Language.get('caca'		, 'CAS'			) , width : 80
					},{ dataIndex: 'fema'			, text : Language.get('fema'		, 'FEMA'		) , width : 80
					},{ dataIndex: 'wdgb'			, text : Language.get('wdgb'		, 'GB'			) , width : 80
					},{ dataIndex: 'kfda'			, text : Language.get('kfda'		, 'KFDA'		) , width : 80
					},{	dataIndex: 'incm_cost'		, text : Language.get('incm_cost'	, '수입원가'		) , width : 80,xtype:'numericcolumn'
					},{	dataIndex: 'hala_numb'		, text : Language.get('hala_numb'	, '할랄번호'		) , width : 120
					},{	dataIndex: 'natr_name'		, text : Language.get('natr_name'	, '천연이름'		) ,  width : 100
					},{ dataIndex: 'adpt_date'		, text : Language.get('adpt_date'	, '등록일자'		) , width : 90 , align:'center'
					}
				]
		}
		return item;
	},
});