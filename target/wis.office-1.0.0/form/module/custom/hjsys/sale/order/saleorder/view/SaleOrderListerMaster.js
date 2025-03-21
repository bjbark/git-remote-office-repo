Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-saleorder-lister-master',
	store		: 'module.custom.hjsys.sale.order.saleorder.store.SaleOrderMaster',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false,
		 enableTextSelection: true
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '마감/해지',
						hidden: true,
						menu : [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'-',
					{	text	: '승인/취소',
						hidden	: (_global.options.acpt_fix_yorn==0),
						menu	: [
							{	text : '승인', action : 'okAction'
							},{	text : '취소', action : 'okCancelAction'
							}
						]
					},
					'-',
					{	text	: '견적확인/취소',
						hidden	: true,
						menu	: [
							{	text : '확인', action : 'hjOkAction', id : 'esti'
							},{	text : '취소', action : 'hjOkAction', id : 'esti1'
							}
						]
					},
					'-',
					'->',
					{	text : '<span class="write-button">출고</span>'	, action : 'osttAction'	, cls: 'button1-style', hidden : _global.hqof_idcd.toUpperCase()=="N1000HNSUN"?false:true } , '-',
//					'-' ,
					{	text : '<span class="write-button">수주복사</span>'	, action : 'copyAction'		, cls: 'button1-style', hidden : false	} ,
//					'-',
					{	text : '<span class="write-button">작업지시서</span>', action : 'printAction'	 , cls: 'button1-style', itemId:'masterPrint'} ,
					'-',
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action ,cls: 'button-style' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action ,cls: 'button-style' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'			,'마감'			) , width : 35, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'acpt_stat_dvcd'	, text : Language.get('acpt_stat_dvcd'		,'진행상태'		) , width : 60, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('acpt_stat_dvcd')
					},{	dataIndex: 'esti_cnfm_yorn'	, text : Language.get('esti_cnfm_yorn'		,'견적'			) , width : 45, align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{	text: Language.get(''	,'체크'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: 'pror_chk'	, text: Language.get(''		, '계획'			) , width:  45, xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), align: 'center'
							},{	dataIndex: 'main_chk'	, text: Language.get(''		, '원자재'		) , width:  45, xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), align: 'center'
							},{	dataIndex: 'sub_chk'	, text: Language.get(''		, '부자재'		) , width:  45, xtype : 'lookupcolumn' , lookupValue : resource.lookup('yorn'), align: 'center'
							}
						]
					},{	dataIndex: 'cstm_name'		, text: Language.get('cstm_name'		, '고객명'		) , width: 220, align: 'left', summaryType: 'count',
					},{	dataIndex: 'dlvy_cstm_name'	, text: Language.get('dlvy_cstm_name'	, '납품처'		) , width: 100, align: 'left'/* 부서 이름으로 들어갈 예정*/
					},{	dataIndex: 'invc_date'		, text: Language.get('invc_date'		, '수주일자'		) , width:  80, align: 'center'
					},{	dataIndex: 'deli_date'		, text: Language.get('deli_date'		, '납기일자'		) , width:  80, align: 'center'
					},{	dataIndex: 'invc_numb'		, text: Language.get('acpt_numb'		, '수주번호'		) , width: 120, align: 'center'
					},{	dataIndex: 'modl_name'		, text: Language.get('modl_name'		, '모델명'		) , width: 200, align: 'left', sortable:true
					},{ dataIndex: 'qntt_totl'		, text: Language.get('','품목수'			) , width : 90 , xtype : 'numericcolumn', align : 'right'
					},{	text: Language.get(''	,'수주량'		), dataIndex : ''	, align : 'center',
						columns: [
							{	dataIndex: 'unit_name'		, text: Language.get('unit_name'		, '단위'			) , width:  70, align: 'center', sortable:true
							},{	dataIndex: 'acpt_qntt'		, text: Language.get('acpt_qntt'		, '수주수량'		) , width:  70, xtype : 'numericcolumn', sortable:true
							}
						]
					},{ header: '품명등록',
						sortable: false,
						width:70,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										text: '<span style="color : white !important">등록</span>',
										width: 55,
										height: 18,
										cls: 'button-style',
										handler: function(){me.exec(rec)}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					},{ dataIndex: 'user_memo'			, text : Language.get('','비고'			) , flex  :  1  , align : 'left', minWidth : 200
					}
				]
			};
		return item;
	},

	exec : function (rec){
		var me		= this,
			select = Ext.ComponentQuery.query('module-saleorder-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-saleorder-worker-editor')[0],
			search = Ext.ComponentQuery.query('module-saleorder-worker-search')[0],
			master = Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-saleorder-layout')[0],
			tree   = Ext.ComponentQuery.query('module-saleorder-tree')[0]
		;

		var err_msg = "";
		if (rec){
			if (rec.get("line_clos") == "1") {
				err_msg = "수주가 마감되어 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		if (rec){
			editor.selectRecord({ lister : master, record : rec }, me);

			lister = tree;
			lister.getStore().clearData();
			lister.getStore().load({
				params:{param:JSON.stringify({invc_numb:rec.get("invc_numb")})
			}, scope:me,
			callback:function(records, operation, success) {
				if (success) {
					lister.getRootNode().expand();
					lister.getSelectionModel().select(0);
				} else {
				}
			}
			});
			layout.getLayout().setActiveItem(1);
		}
	},

});
