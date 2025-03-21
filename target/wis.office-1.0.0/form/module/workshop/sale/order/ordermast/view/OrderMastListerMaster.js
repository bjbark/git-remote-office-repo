Ext.define('module.workshop.sale.order.ordermast.view.OrderMastListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ordermast-lister-master',
	store		: 'module.workshop.sale.order.ordermast.store.OrderMastMaster',

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
					{	text : '취소', action : 'cofmCancelAction'	},
					'->', '-' ,
//					{	text : '<span class="write-button">자료업로드</span>', action : 'priceAction'		, cls: 'button1-style',width : 80 	},
//					{	text : '<span class="write-button">견적서 발행</span>', action : 'printAction'	, cls: 'button1-style'	} , '-',
//					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
//					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
//					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'regi_path_dvcd'	, text : Language.get('regi_path_dvcd'	,'경로구분'	)	, width : 55 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('regi_dvcd')
					},{ dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'수주확정'	)	, width : 60 , align : 'center', xtype:'lookupcolumn',lookupValue:resource.lookup('yorn')
					},{	dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'견적번호'	)	, width : 70 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'견적일자'	)	, width : 80 , align : 'center'
					},{ dataIndex: 'mmbr_name'		, text : Language.get('mmbr_name'		,'회원명'		)	, width : 90
					},{ dataIndex: 'tele_numb'		, text : Language.get('tele_numb'		,'전화번호'	)	, width : 110, align : 'center'
					},{ dataIndex: 'mail_addr'		, text : Language.get('mmbr_name'		,'메일주소'	)	, width : 110
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	)	, width : 160
					},{ dataIndex: 'invc_name'		, text : Language.get('invc_name'		,'주문명'		)	, width : 160
					},{ header: '품명조회',
						sortable: false,
						width:70,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									renderTo: Ext.query("#"+id)[0],
									text: '<span style="color : white !important">조회</span>',
									width: 55,
									height: 18,
									cls: 'button-style',
									handler: function(){me.exec(rec)}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					},{ dataIndex: 'dlvy_mthd_dvcd'		, text : Language.get('dlvy_mthd_dvcd'	,'배송방법'		)	, width : 70, align : 'center'	, xtype:'lookupcolumn',lookupValue:resource.lookup('dlvy_mthd_dvcd')
					},{ dataIndex: 'addr_1fst'			, text : Language.get('addr_1fst'		,'배송지'			)	, width : 280, align : 'left'
					},{ dataIndex: 'addr_2snd'			, text : Language.get('addr_2snd'		,'상세주소'		)	, width : 100, align : 'left'
					},{ dataIndex: 'rctr_name'			, text : Language.get('rctr_name'		,'수취인'			)	, width : 100, align : 'left'
					},{ dataIndex: 'dlvy_tele_numb'		, text : Language.get('dlvy_tele_numb'	,'배송지전화번호'	)	, width : 100, align : 'center'
					},{ dataIndex: 'dlvy_memo'			, text : Language.get('dlvy_memo'		,'배송메모'		)	, flex : 1

					}
				]
			}
		;
		return item;
	},

	exec : function (rec){
		var me		= this,
			select = Ext.ComponentQuery.query('module-ordermast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-ordermast-worker-editor')[0],
			search = Ext.ComponentQuery.query('module-ordermast-worker-search')[0],
			master = Ext.ComponentQuery.query('module-ordermast-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-ordermast-layout')[0],
			tree   = Ext.ComponentQuery.query('module-ordermast-tree')[0]
		;

		var err_msg = "";
//		if (rec){
			tree.select({
				 callback : function(records, operation, success) {
//					console.log(records);
//					if (success) {
						tree.getSelectionModel().select(0);
						editor.selectRecord({ lister : master, record : rec }, tree);
						layout.getLayout().setActiveItem(1);
//					} else {}
				}, scope : tree
			}, { invc_numb:rec.get("invc_numb")});

//		}
	},

});
