Ext.define('module.custom.sjflv.cust.cstmmast.view.CstmMastDeliLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-cstmmast-deli-lister',
	store		: 'module.custom.sjflv.cust.cstmmast.store.CstmMastDeli',
	border		: 0,
	columnLines	: true,
	selModel: {selType:'cellmodel'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function (config) {
		var me     = this;
		me.dockedItems = [ me.createWest()];
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent(arguments);
	},

	createWest : function () {
		var  me   = this,
			item = {
				xtype : 'fieldset',
				style: {backgroundColor : 'white'},
				flex	: 100 ,
				border	: 0,
				region	: 'center',
				margin	: '0 0 0 0',
				items	: [
						{	xtype : 'fieldset',
							border	: 3,
							flex	: 1,
							layout: 'hbox',
							border: 0,
							align:'center',
							margin: '0 0 0 0',
							defaults: { xtype: 'fieldset', layout: 'hbox', margin : '5 5 0 0', padding:'0', border: 0 },
							layout	: 'hbox',
							items : [
							{	xtype			: 'label'			,
								fieldCls		: 'requiredindex'	,
								text			: '납품처명'		,
								margin			: '14 0 0 0'		,
								style			: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	xtype			: 'textfield'	,
								name			: 'find_name2',
								width			: 175,
								editable		: true,
								margin			: '12 10 5 10',
								enableKeyEvents : true,
								clearable		: true,
								emptyText		: '조회할 납품처명을 입력하세요.',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction2]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton);
										}
									}
								}
							},{	xtype			: 'label'			,
								fieldCls		: 'requiredindex'	,
								text			: '납품 담당자명'			,
								margin			: '14 0 0 0'		,
								style			: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	xtype			: 'textfield' ,
								name			: 'find_name3',
								width			: 175,
								margin			: '12 0 5 10',
								editable		: true,
								enableKeyEvents : true,
								clearable	: true,
								emptyText	: '조회할 납품 담당자명을 입력하세요.',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction2]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton);
										}
									}
								}
							},{	name : 'dlvy_cstm_idcd', xtype : 'textfield' , hidden : true
							},{	text	: '<span class="btnTemp" style="display: inline-block; font-size:1.3em; text-align:center; margin-top : 4;">조회</span>',
								xtype	: 'button',
								margin	: '10 0 10 20',
								width 	: 50,
								cls		: 'button-style',
								action  : 'selectAction2'
							}
						]
					}
				]
			};
			return item;
		},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					}
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center', backgroundColor : 'white'},
				items	: [
					{	dataIndex:	'dely_cstm_name'		, width:  100, align : 'left'   , text: Language.get( 'dely_cstm_name'	, '납품처명'	),
						editor	: {
							maxLength		: 20,
							maxLengthText	: '한글 20자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_drtr_name'		, width:  80, align : 'left'   , text: Language.get( 'dlvy_drtr_name'	, '납품담당자명'	),
						editor	: {
							maxLength		: 20,
							maxLengthText	: '한글 20자 이내로 작성하여 주십시오.',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'trnt_mean_dvcd'		, width:  80, align : 'left'   , text: Language.get( 'trnt_mean_dvcd'	, '운송수단'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'trnt_mean_dvcd' ),
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('trnt_mean_dvcd'),
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_tele_numb'		, width: 100, align : 'left'   , text: Language.get( 'dlvy_tele_numb'	, '배송전화번호'	),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_hdph_numb'		, width: 100, align : 'left'   , text: Language.get( 'dlvy_hdph_numb'	, '납품휴대폰번호'),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_faxi_numb'		, width: 100, align : 'left'   , text: Language.get( 'dlvy_faxi_numb'	, '납품팩스번호'	),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_mail_addr'		, width: 180, align : 'left'   , text: Language.get( 'dlvy_mail_addr'	, '납품이메일'	),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_zpcd'				, width: 80, align : 'left'   , text: Language.get( 'dlvy_zpcd'			, '우편번호'		),
						editor	: {
							xtype			: 'popupfield',
							editable : true,
							enableKeyEvents : true,
							name			: 'dlvy_zpcd',
							selectOnFocus	: true,
							allowBlank		: true,
							popup			: {
								select	: 'DAUM',
								widget	: 'popup-zipcode-search',
								params	: { },
								result	: function(records, nameField){
									if( records.length > 0){
									var grid      = nameField.up('grid'),
										store     = me.getStore(),
										selection = grid.view.getSelectionModel().getSelection()[0],
										index     = store.indexOf(selection),
										address   = records[0]
										;
										nameField.setValue( address.zonecode );
										grid.view.getSelectionModel().selected.items[0].set('dlvy_addr_1fst',address.roadAddress);
										grid.plugins[0].startEdit(index , 8);
									}
								}
							}
						}
					},{	dataIndex:	'dlvy_addr_1fst'		, width : 200, align : 'left'   , text: Language.get( 'dlvy_addr_1fst'	, '배송주소1'	),
						editor	: {
							name			: 'dlvy_addr_1fst',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_addr_2snd'		, width : 120, align : 'left'   , text: Language.get( 'dlvy_addr_2snd'	, '배송주소2'	),
						editor	: {
							name			: 'dlvy_addr_2snd',
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_remk_text'		, width : 100, align : 'left'   , text: Language.get( 'dlvy_remk_text'	, '납품비고'		),
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_lcal_dvcd'		, width : 100, align : 'left'   , text: Language.get( 'dlvy_lcal_dvcd'	, '배송지역'		), xtype: 'lookupcolumn' , lookupValue: resource.lookup('dlvy_lcal_dvcd'),
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('dlvy_lcal_dvcd'),
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'rpst_dlvy_yorn'		, width:  80, align : 'left'   , text: Language.get( 'rpst_dlvy_yorn'	, '대표납품여부'	), xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'yorn' ),
						editor	: {
							xtype			: 'lookupfield',
							lookupValue		: resource.lookup('yorn'),
							selectOnFocus	: true,
							allowBlank		: true
						}
					},{	dataIndex:	'dlvy_cstm_idcd'		, width:  80, align : 'left'   , text: Language.get( 'dlvy_cstm_idcd'	, '납품처ID'	),hidden : true,
						editor	: {
							xtype			: 'textfield',
							selectOnFocus	: true,
							allowBlank		: true
						}
					}
				]
			};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;

			if(field === 'istt_qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
					fn : function (button) {
						if (button==='yes') {
							context.record.set(field, context.value);
							me.cellEditAfter(editor, context);
						}
					}
				});
				return false;
			}

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
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
					/* Ctrl + Insert */
					{	ctrl:true, key: 45,
						fn: function(key,e){
							me.appendRow({});
						}
					},
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	},

	/**
	 * 새로운 Line을 추가한다....(자료 입력은 그리드에서 직접 입력한다.)
	 */
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-cstmmast-lister')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0],
			editor		= Ext.ComponentQuery.query('module-cstmmast-editor')[0],
			new_invc_numb
		;

		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		Ext.Ajax.request({
			url : _global.location.http() + '/listener/seq/maxid.do',
			object		: resource.keygen,
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'cstm_deli'
				})
			},
			async	: false,
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});

		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			dlvy_cstm_idcd	: new_invc_numb,
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			cstm_idcd		: editor.getValues().cstm_idcd,
			dlvy_drtr_name	: '',
			trnt_mean_dvcd	: '',
			dlvy_tele_numb	: '',
			dlvy_hdph_numb	: '',
			dlvy_faxi_numb	: '',
			dlvy_mail_addr	: '',
			dlvy_zpcd		: '',
			dlvy_addr_1fst	: '',
			dlvy_addr_2snd	: '',
			dlvy_remk_text	: '',
			dlvy_lcal_dvcd	: '',
			rpst_dlvy_yorn	: '1'
		});
		Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},
	/**
	 * 선택한 라인을 삭제처리 한다.
	 */
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					me.getStore().remove (records);
				}
			}
		});
		Ext.ComponentQuery.query('module-cstmmast-editor')[0].down('[name=change]').setValue('Y');
	},

 });





