Ext.define('module.custom.komec.item.bommast.view.BomMastLister3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-komec-bommast-lister3',
	store		: 'module.custom.komec.item.bommast.store.BomMastLister3',
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
	features	: [{  ftype: 'grid-summary' } ],

	border : 0  ,
	title  : Language.get('','배합기준'),

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'-',
//					{	text : '<span class="write-button">배합표 복사</span>', action : 'copyAction'	, cls: 'button-style'} ,
					'-',
					{	text : '<span class="write-button">▲</span>', action : 'updownAction'	, cls: 'button1-style', width:30 , itemId:'upBom'		},
					'-',
					{	text : '<span class="write-button">▼</span>', action : 'updownAction'	, cls: 'button1-style', width:30 , itemId:'downBom'	},

					'->',
					{	text : '<span class="write-button">행추가</span>', handler: me.rowInsert		, cls: 'button-style'} ,
					{	text : '<span class="write-button">행삭제</span>', handler: me.rowDelete		, cls: 'button1-style'} ,
					'-',
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'	},
					{	text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action , cls: 'button-style'	}
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items	: [
				{	text : Language.get('line_seqn'			, '순번'		) , dataIndex: 'line_seqn'	, width : 45 ,   xtype: 'numericcolumn', summaryType : 'count'
				},{	text : Language.get('acct_name'			,'계정구분'		) , dataIndex: 'acct_name'	, width : 80, align : 'center'
				},{	text : Language.get('item_code'			, '품목코드'	) , dataIndex: 'item_code'	, width : 70 ,   align : 'center'
				},{	text : Language.get('item_name'			, '품명'		) , dataIndex: 'item_name'	, width : 160
				},{	xtype	: 'actioncolumn',
					header	: '',
					width	: 20,
					align	: 'center',
					items	: [
						{	iconCls	: Const.SELECT.icon,
							tooltip	: '품목코드 찾기',
							handler	: function (grid, rowIndex, colIndex, item, e, record) {
								var revs		= Ext.ComponentQuery.query('module-komec-bommast-lister2')[0]
								var revsSelect	= revs.getSelectionModel().getSelection()[0];
								var acct_bacd   = (revsSelect.get('revs_dvcd') == 1) ? "삼정(생산배합)" : "ECO";

								resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-item-popup-v4',  // 임시, 삼정 품목코드 관리 완성되면 popup 교체
									params:{
										 stor_grp : _global.stor_grp , line_stat : '0',acct_bacd : acct_bacd
									},
									onwer : this,
									result	: function(records) {
										var value = records[0];
										record.set('ivst_item_idcd',value.data.item_idcd);
										record.set('item_code',value.data.item_code);
										record.set('item_name',value.data.item_name);
										record.set('item_spec',value.data.item_spec);
									}
								});
							}
						}
					]
				},{	text : Language.get('item_spec'			, '규격'			) , dataIndex: 'item_spec'		, width : 100
				},{	text : Language.get('mixx_rate'			, '배합비율'		) , dataIndex: 'mixx_rate'		, width : 70  ,   xtype: 'numericcolumn', summaryType: 'sum'
					, tdCls : 'editingcolumn',
					editor	: {
						xtype		:'numericfield',
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									grid.plugins[0].startEdit(row, grid.columns[6]);
								}
							}
						}
					}
//				},{	text : Language.get('used_yorn'	, 'OEM'			) , dataIndex: 'used_yorn'	, width :  60 , xtype:'lookupcolumn',lookupValue:resource.lookup('yorn')
//					, tdCls : 'editingcolumn',
//					editor	: {
//						xtype		:'lookupfield',
//						selectOnFocus: true,
//						allowBlank	: false,
//						lookupValue	: resource.lookup('yorn'),
//						listeners:{
//							change : function(self, e) {
//								var grid = this.up('grid'),
//									store = me.getStore(),
//									selection = me.getSelectionModel().getSelection()[0],
//									row = store.indexOf(selection);
//								grid.plugins[0].startEdit(row+1, grid.columns[5]);
//							}
//						}
//					}
//				},{	text : Language.get('caca'		, 'CAS'			) , dataIndex: 'caca'	, width : 80
//				},{	text : Language.get('fema'		, 'FEMA'		) , dataIndex: 'fema'	, width : 80
//				},{	text : Language.get('wdgb'		, 'GB'			) , dataIndex: 'wdgb'	, width : 80
//				},{	text : Language.get('kfda'		, 'KFDA'		) , dataIndex: 'kfda'	, width : 80
//				},{	text : Language.get('incm_cost'	, '수입원가'		) , dataIndex: 'incm_cost'	, width : 80,xtype:'numericcolumn'
//				},{	text : Language.get('hala_numb'	, '할랄번호'		) , dataIndex: 'hala_numb'	, width : 120
//				},{	text : Language.get('natr_name'	, '천연이름'		) , dataIndex: 'natr_name'	, width : 100
				},{	text : Language.get('adpt_date'	, '등록일시'		) , dataIndex: 'adpt_date'	, width : 80
				},{	text : Language.get('wkct_name'	, '투입공정'		) , dataIndex: 'wkct_name'	, width : 100
				},{	xtype	: 'actioncolumn',
					tdCls	: 'editingcolumn',
					header	: '',
					width	: 20,
					align	: 'center',
					items	: [
						{	iconCls	: Const.CANCEL.icon,
							handler	: function (grid, rowIndex, colIndex, item, e, record) {
//								var Select	= grid.getSelectionModel().getSelection()[0];
								record.set('wkct_name', '');  // 'wkct_name' 값을 초기화
								record.set('wkct_idcd', '');  // 'wkct_idcd' 값을 초기화
							}
						}
					]
				},{	text : Language.get('wkct_idcd'	, '투입공정ID'		) , dataIndex: 'wkct_idcd'	, width : 100 , hidden :true
				},{	xtype	: 'actioncolumn',
					tdCls	: 'editingcolumn',
					header	: '',
					width	: 20,
					align	: 'center',
					items	: [
						{	iconCls	: Const.SELECT.icon,
							handler	: function (grid, rowIndex, colIndex, item, e, record) {

								resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-wkct-popup',
//									title	: '투입공정 찾기',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									onwer	: this,
									result	: function(records) {
										var value = records[0];
										record.set('wkct_name',value.data.wkct_name);
										record.set('wkct_idcd',value.data.wkct_idcd);
									}
								});
							}
						}
					]
				}
			]
		};
		return item;
	},
	cellEditAfter : function (editor, context) {
		var me = this;
//		console.log(editor);
//		context.record.recalculation( me.editor.getRecord() );
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;


			return true;
		},

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
										Ext.ComponentQuery.query('module-purcordr-worker-editor')[0].down('[name = change]').setValue('Y');
									}
								}
							});
						}
					}
				]
			});
		}
	},
	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			select		= myform.getSelectionModel().getSelection()[0],
			master		= Ext.ComponentQuery.query('module-komec-bommast-lister1')[0],
			revs		= Ext.ComponentQuery.query('module-komec-bommast-lister2')[0],
			mstSelect	= master.getSelectionModel().getSelection()[0],
			revsSelect	= revs.getSelectionModel().getSelection()[0],
			lastidx		= store.count(),
			revs_numb	= 1
		;
		if(revsSelect){
			max_seq = 0;
			store.each(function(findrecord) {
				if (findrecord.get('line_seqn') > max_seq) {
					max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
				}
			});
			max_seq = max_seq + 1;
			if(revsSelect){
				revs_numb = revsSelect.get('revs_numb');
			}else if(revs.getStore().count()>0 && !revsSelect){
				Ext.Msg.alert('알림','리비전을 선택 후 진행가능합니다.');
				return;
			}
			record = Ext.create( store.model.modelName , {
				updt_user_name	: _global.login_nm,
				prnt_item_idcd	: mstSelect.get('item_idcd'),
				revs_numb		: revs_numb,
				revs_dvcd		: revsSelect.get('revs_dvcd'),
				updt_idcd		: _global.login_id,
				line_seqn		: max_seq,	//
				prnt_idcd		: revsSelect.get('prnt_idcd'),
				chk				: 'Y'
			});
			// ROW 추가
			store.add(record);
			myform.plugins[0].startEdit(lastidx , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
		}else{
			Ext.Msg.alert('알림','리비전 선택 후 진행해주세요.');
		}
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
					}
				}
			});
		}
	},
});





