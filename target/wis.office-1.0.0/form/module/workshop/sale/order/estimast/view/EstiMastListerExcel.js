Ext.define('module.workshop.sale.order.estimast.view.EstiMastListerExcel', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-estimast-lister-excel',
	store		: 'module.workshop.sale.order.estimast.store.EstiMastExcel',

	width		: 515,
	minWidth	: 200,
	split		: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : true }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	viewConfig: {
		markDirty: false,
		loadMask : false
	},
	/**
	*
	*/
	initComponent: function () {
		var me = this;
		me.columns	= me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
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
					{	dataIndex: 'item_name'		, text : Language.get('item_name'		, '품명'			) , width : 35
					},{	dataIndex: 'acct_bacd_name'	, text : Language.get('acct_bacd_name'	, '계정구분'		) , width : 60,
					},{	dataIndex: 'drwg_numb'		, text : Language.get('drwg_numb'		, '도면번호'		) , width : 45
					},{	dataIndex: 'revs_numb'		, text : Language.get('revs_numb'		, 'Rev'			) , width: 220, align: 'left', summaryType: 'count',
					},{	dataIndex: 'mtrl_bacd_name'	, text: Language.get('mtrl_bacd_name'	, '재질'			) , width: 100, align: 'left'/* 부서 이름으로 들어갈 예정*/
					},{ dataIndex: 'item_tick'		, text: Language.get('item_tick'		, '두께'			) , width : 90 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'item_leng'		, text: Language.get('item_leng'		, '길이(X)'		) , width : 90 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'item_widh'		, text: Language.get('item_widh'		, '넓이(Y)'		) , width : 90 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'pqty_ndqt'		, text: Language.get('pqty_ndqt'		, '개당소요량'		) , width : 90 , xtype : 'numericcolumn', align : 'right'
					},{ dataIndex: 'need_qntt'		, text: Language.get('need_qntt'		, '소요량'		) , width : 90 , xtype : 'numericcolumn', align : 'right'
					}
				]
			};
		return item;
	},

	exec : function (rec){
		var me		= this,
			select = Ext.ComponentQuery.query('module-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
			search = Ext.ComponentQuery.query('module-estimast-worker-search')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			tree   = Ext.ComponentQuery.query('module-estimast-tree')[0]
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
