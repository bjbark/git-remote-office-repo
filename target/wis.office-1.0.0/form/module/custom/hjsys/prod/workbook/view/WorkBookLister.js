Ext.define('module.custom.hjsys.prod.workbook.view.WorkBookLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-hjsys-workbook-lister',
	store		: 'module.custom.hjsys.prod.workbook.store.WorkBook',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } , { ptype:'filterbar'}  ],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

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
				pagingButton : true,
				items	: [
					{	xtype   : 'button',
						iconCls : 'filterIcon',
						toggleGroup:'detail',
						listeners:{
							toggle:function(toggle){
								var filter = me.filterBar;
									filter.setVisible(toggle.pressed);
							}
						},
					},
					'-', '->', '-',
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action  : Const.MODIFY.action , cls: 'button-style' }, //저장

					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style', itemId : 'lister' } //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'invc_date'		, text : Language.get('prod_date'		, '생산일자'		) , width :  90 , align : 'center'
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	, '진행상태'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd')
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get('dayn_dvcd'		, '주/야'			) , width :  60 , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd'),hidden:(_global.hq_id.toUpperCase()=="N1000HNSUN"?true:false)
					},{	dataIndex: 'acpt_numb'		, text : Language.get('acpt_numb'		, '수주번호'		) , width : 100 , align : 'center'
					},{	dataIndex: 'drwg_numb'		, text : Language.get('drwg_numb'		, '도면번호'		) , width : 150 , align : 'left'
					},{	dataIndex: 'modl_name'		, text : Language.get('modl_name'		, '모델명'			) , width : 200 , align : 'left'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		, '품목코드'		) , width :  70 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		, '품명'			) , width : 300 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		, '품목규격'		) , width :  90 , align : 'left'
					},{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		, '공정'			) , width :  90 , align : 'left'
					},{ dataIndex: 'wker_name'		, text : Language.get('wker_name'		, '작업자'			) , width :  70 , align : 'left'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		, 'LOT번호'		) , width : 100 , align : 'left', hidden : true
					},{	dataIndex: 'work_strt_dttm'	, text : Language.get('work_strt_dttm'	, '시작일시'		) , width : 115 , align : 'center'
					},{	dataIndex: 'work_endd_dttm'	, text : Language.get('work_endd_dttm'	, '종료일시'		) , width : 115 , align : 'center'
					},{	dataIndex: 'need_time'		, text : Language.get('need_time'		, '소요시간'		) , width :  85 , align : 'center'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		, '지시수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		, '생산수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'good_qntt'		, text : Language.get('good_qntt'		, '양품수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		, '불량수량'		) , width :  70 , align : 'right' , xtype: 'numericcolumn', summaryType : 'sum'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		, '메모사항'		) , flex  :   1 , align : 'left' , hidden : true
					}
				]
			}
		;
		return item;
	 }
});
