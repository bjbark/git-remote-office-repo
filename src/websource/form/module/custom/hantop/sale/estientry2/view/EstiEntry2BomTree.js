Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2BomTree', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-estientry2-tree',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//	store		: 'module.custom.hantop.item.bommast.store.EstiEntryBomTree',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,

	viewConfig	: {
		plugins: { ptype: 'treeviewdragdrop' }
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
				items : [
					,'-','->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style'},
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , cls: 'button-style'},
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
//					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , cls: 'button-style'},
					]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center', sortable: false, menuDisabled: true },
				items : [
					{dataIndex: 'text'			,text	: '품목 트리'	, width : 300	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ dataIndex: 'acct_bacd'		, width :  65 , align : 'center'	, text : Language.get('acct_bacd'		,'계정구분'		) ,xtype : 'lookupcolumn', lookupValue : [['1001','원자재'],['1002','부자재'],['1003','소모품'],['2001','제공품'],['2002','반제품'],['3000','제품'],['4000','상품'],['5000','집기비품'],['6000','공구기구']], hidden : true
					},{ dataIndex: 'item_code'		, width : 130 , align : 'center'	, text : Language.get('item_code'		,'품목코드'		) , hidden : true,
					},{ dataIndex: 'line_seqn'		, width :  40 , align : 'center'	, text : Language.get('line_seqn'		,'순번'		) , summaryType: 'count', hidden : true
					},{ dataIndex: 'item_spec'		, width : 150 , align : 'right'		, text : Language.get('item_spec'		,'품목규격'		) , hidden : true,
					},{ dataIndex: 'item_widh'		, width :  70 , align : 'right'		, text : Language.get('item_widh'		,'품목폭'		) ,xtype : 'numericcolumn', hidden : true,
					},{ dataIndex: 'item_hght'		, width :  70 , align : 'right'		, text : Language.get('item_hght'		,'품목높이'		) ,xtype : 'numericcolumn', hidden : true,
					},{ dataIndex: 'item_tick'		, width :  70 , align : 'right'		, text : Language.get('item_tick'		,'품목두께'		) ,xtype : 'numericcolumn', hidden : true,
					},{ dataIndex: 'wdmt_dvcd'		, width :  65 , align : 'center'	, text : Language.get('wdmt_dvcd'		,'창호자재'		) ,xtype : 'lookupcolumn', lookupValue : resource.lookup('wdmt_dvcd'), hidden : true,
					},{ dataIndex: 'bfsf_dvcd'		, width :  65 , align : 'center'	, text : Language.get('bfsf_dvcd'		,'틀.짝.망'	) ,xtype : 'lookupcolumn', lookupValue : resource.lookup('bfsf_dvcd'),
					},{ dataIndex: 'topp_clmm'		, width :  90 , align : 'right'		, text : Language.get('topp_clmm'		,'상부걸림치수'	) ,xtype : 'numericcolumn', hidden : true,
					},{ dataIndex: 'bttm_clmm'		, width :  90 , align : 'right'		, text : Language.get('bttm_clmm'		,'하부걸림치수'	) ,xtype : 'numericcolumn', hidden : true,
					},{ dataIndex: 'side_clmm'		, width :  90 , align : 'right'		, text : Language.get('side_clmm'		,'측부걸림치수'	) ,xtype : 'numericcolumn', hidden : true,
					},{ dataIndex: 'calc_frml'		, width : 150 , align : 'left'		, text : Language.get('calc_frml'		,'계산공식'		)
					},{ dataIndex: 'need_qntt'		, width :  60 , align : 'right'		, text : Language.get('need_qntt'		,'소요량'			) ,xtype : 'numericcolumn',
						renderer: function(val,meta,rec) {
							if(rec.data.item_idcd == 'wind_assi_mtrl' || rec.data.item_idcd == 'wind_bf' || rec.data.item_idcd == 'wind_mf' || rec.data.item_idcd == 'wind_sf'){
								return ;
							}else{
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{ dataIndex: 'esnt_yorn'		, width :  60 , align : 'center'	, text : Language.get('esnt_yorn'		,'필수여부'		) ,xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'),
					},{ dataIndex: 'auto_cutt_yorn'	, width : 100 , align : 'center'	, text : Language.get('auto_cutt_yorn'	,'자동절단여부'	) ,xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true,
					},{ dataIndex: 'auto_weld_yorn'	, width : 100 , align : 'center'	, text : Language.get('auto_weld_yorn'	,'자동용접여부'	) ,xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), hidden : true,
					},{ dataIndex: 'user_memo'		, flex : 1    , align : 'left'		, text : Language.get('user_memo'		,'비고'			)
					},{ dataIndex: 'item_idcd'		, flex : 1    , align : 'left'		, hidden : true
					}
				]
			}
		;
		return item;
	}
});