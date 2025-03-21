Ext.define('module.prod.order.prodorderv2.view.ProdOrderV2Detail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodorderv2-detail',
	store		: 'module.prod.order.prodorderv2.store.ProdOrderV2Detail',

	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: {	ptype  :'cellediting-directinput', clicksToEdit: 1 },	columnLines : true,
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		console.log(_global.stor_id);
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-' ,
					{	text : '<span class="write-button">지시서발행</span>', action : 'writeAction2', cls: 'button1-style',
						hidden	: (_global.stor_id.toUpperCase() != 'N1000INKOP1000'?true:false)},
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'			) , width : 40  , align : 'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'		) , width : 100 , hidden	: (_global.stor_id.toUpperCase() == 'N1000INKOP1000'?true:false)
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품번'			) , width : 100 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 100
					},{ dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'단위명'		) , width : 60 , align : 'center'
					},{ dataIndex: 'mtrl_bacd_name'	, text : Language.get('mtrl_bacd_name'	,'재질명'		) , width : 80 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명'		) , width : 100
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		) , width : 100
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var invc_numb,
										line_seqn,
										otod_yorn,
										title
									;
									var sourc_dvcd = "1";
									if(record.get('invc_numb') && record.get('line_seqn') ){
										invc_numb = record.get('invc_numb');
										line_seqn = record.get('line_seqn');
										otod_yorn = record.get('otod_yorn');
										if(otod_yorn == '1') {
											title = '외주거래처 찾기';
										}else if(otod_yorn != '1'){
											otod_yorn = '0';
											title = '설비 찾기';
										}
									}
									var store = grid.getStore();
									resource.loadPopup({
										select	: 'SINGLE',
										title	: title,
										widget	: 'lookup-work-cvic-popup',
										params:{
											invc_numb	: invc_numb,
											line_seqn	: line_seqn,
											sourc_dvcd	: sourc_dvcd,
											otod_yorn	: otod_yorn,
										},
										result	: function(records) {
											var	parent = records[0];
											record.set('cvic_idcd',parent.data.idcd);
											record.set('cvic_name',parent.data.name);
											store.sync({
												callback:function(){
													store.reload();
												}
											});
										},
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명'		) , width : 100,hidden:true
					},{ dataIndex: 'bzpl_name'		, text : Language.get('bzpl'			,'사업장'		) , width : 100,hidden:true
					},{ dataIndex: 'wkct_item_name'	, text : Language.get('wkct_item_name'	,'공정품명'		) , width : 100
					},{ dataIndex: 'prod_dept_name'	, text : Language.get('prod_dept_name'	,'생산부서명'		) , width : 100
					},{ dataIndex: 'dayn_dvcd'		, text : Language.get('dayn_dvcd'		,'주/야'			) , width : 80 , align : 'center', align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd')
					},{ dataIndex: 'plan_strt_dttm'	, text : Language.get('plan_strt_dttm'	,'착수예정'		) , width : 120 , align : 'center'
					},{	dataIndex: 'pref_rank'		, text : Language.get('pref_rank'		,'우선순위'		) , width : 60 , align : 'center',
					},{ dataIndex: 'plan_endd_dttm'	, text : Language.get('plan_endd_dttm'	,'종료예정'		) , width : 125 , align : 'center',hidden:true
					// 2021.12.15 - 이강훈 - 수주수량  삭제 (마스터 이동)
					//},{ dataIndex: 'acpt_qntt'		, text : Language.get('acpt_qntt'		,'수주수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right'
					// 2021.12.15 - 이강훈 - 생산수량 추가
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'		) , width : 80  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'stok_used_qntt'	, text : Language.get('stok_used_qntt'	,'재고사용수량'	) , width : 90  , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'pckg_cotr_bacd'	, text : Language.get('pckg_cotr_bacd'	,'포장용기'		) , width : 80 , align : 'center', align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('pckg_cotr_bacd'),hidden	: (_global.stor_id.toUpperCase() == 'N1000INKOP1000'?true:false)
					},{ dataIndex: 'insp_wkct_yorn'	, text : Language.get('insp_wkct_yorn'	,'검사공정'		) , width : 80 , align : 'center', align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'last_wkct_yorn'	, text : Language.get('last_wkct_yorn'	,'최종공정'		) , width : 80 , align : 'center', align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'line_stat'		, text : Language.get('cofm_yorn'		,'확정여부'		) , width : 80 , align : 'center', align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'진행상태'		) , width : 80 , align : 'center', align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd')
					}
				]
			}
		;
		return item;
	}
});