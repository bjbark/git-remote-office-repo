Ext.define('module.prod.order.prodmonitering.view.ProdMoniteringListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodmonitering-lister-master',
	store		: 'module.prod.order.prodmonitering.store.ProdMoniteringMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,stripeRows : true },
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

					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' , //엑셀버튼.
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
					{ 	dataIndex: 'dept_name'		, width :  110, align : 'center'		, text : Language.get('dept_name'		,'부서명'	)
					},{ dataIndex: 'cvic_name'		, width :  100, align : 'center'		, text : Language.get('cvic_name'		,'호기'		)
					},{ dataIndex: 'runn_stat'		, width :  80 , align : 'center'		, text : Language.get('runn_stat'		,'가동상태'	), xtype: 'lookupcolumn'  ,  lookupValue : [['비가동','비가동','black' ], ['생산중', '생산중', 'blue'],['일시정지','일시정지','red']], align:'center'
					},{ dataIndex: 'cvic_idcd'		, width :  120							, text : Language.get('cvic_idcd'		,'설비ID'	) , hidden : true
					},{ dataIndex: 'lott_numb'		, width :  80							, text : Language.get('lott_numb'		,'생산 Lot'	)
					},{ dataIndex: 'mold_idcd'		, width :  80, align : 'center'			, text : Language.get('mold_idcd'		,'금형NO'	)
					},{ dataIndex: 'item_idcd'		, width :  80, align : 'center'			, text : Language.get('item_idcd'		,'품목코드'	)
					},{ dataIndex: 'mtrl_name'		, width :  80, align : 'center'			, text : Language.get('mtrl_name'		,'재질'		)
					},{ dataIndex: 'cavity'			, width :  80, align : 'center'			, text : Language.get('cavity'			,'cavity'	)
					},{ dataIndex: 'cycl_time'		, width :  80, align : 'center'			, text : Language.get('cycl_time'		,'C/T'		)
					},{ dataIndex: 'indn_qntt'		, width :  85, xtype : 'numericcolumn'	, text : Language.get('indn_qntt'		,'생산계획수량'	)
					},{ dataIndex: 'plan_shot'		, width :  80, xtype : 'numericcolumn'	, text : Language.get('plan_shot'		,'계획타수'	)
					},{ dataIndex: 'runn_shot'		, width :  80, xtype : 'numericcolumn'	, text : Language.get('runn_shot'		,'진행타수'	)
					},{ dataIndex: 'work_strt_dttm'	, width : 135, align : 'center'			, text : Language.get('work_strt_dttm'	,'시작시간'	)
					},{ dataIndex: 'runn_time'		, width :  80, align : 'center'			, text : Language.get('runn_time'		,'생산시간'	),
						renderer:function(val, meta, record){
							var floor = (Number(val)-record.get('loss_time'))/60;
							var value = floor.toFixed(1);
							if(val == 0){
								return val;
							}
							return value;
						}
					},{ dataIndex: 'loss_time'		, width :  80, align : 'center'			, text : Language.get('loss_time'		,'유실시간'	),
						renderer:function(val, meta, record){
							var floor = Number(val)/60;
							var value = floor.toFixed(1);
							if(val == 0){
								return val;
							}
							return value;
						}
					},{ dataIndex: 'runn_rate'		, flex :  1, align : 'center'			, text : Language.get('runn_rate'		,'진행율'	),
						renderer: function(value, meta, record){
							pt = value/100;
							var id = Ext.id();
							Ext.defer(function (id,pt) {
								var p = Ext.create('Ext.ProgressBar',{
									renderTo: id,
									animate	: true,
									width	: '100%',
									value	: pt,
									text	: (pt*100).toFixed(2)+"%",
								});
							}, 50, undefined, [id,pt]);
							return "<div id='" + id + "'></div>";
						}
					}
				]
			}
		;
		return item;
	 }

});
