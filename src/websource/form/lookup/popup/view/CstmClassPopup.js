/**
 */
Ext.define('lookup.popup.view.CstmClassPopup', { extend: 'Axt.popup.Search',
	alias	: 'widget.lookup-cstm-clss-popup',
	store	: 'lookup.popup.store.CstmClassPopup',

	title	: Language.get('cstm_clss_popup','거래처 분류 찾기'),
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	choiceRecord : undefined,
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				layout		: { type: 'hbox', align: 'stretch' },
				dockedItems	: [ me.searchForm() , me.finishTool() ],
				items		: [
					{	xtype		: 'grid-panel',
						itemId		: 'cstmclass1' ,
						flex		: 2.5 ,
						style		: Const.borderLine.right,
						border		: 0  ,
						margin		: '0 1 0 0' ,
						defaults	: {style: 'text-align:center'},
						viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
						store		: Ext.create( me.store ),
						columns		: [{ text: Language.get('class_1','대분류') , dataIndex: 'clss_name',  flex : 1  }],
						listeners	: {
							itemclick : function (dv, record, item, index, e) {
								me.down('[name=lcls_idcd]').setValue(record.get('clss_idcd'));
								me.selectRecord( record);
							},
							itemdblclick: function(dataview, index, item, e) {
								if (me.popup.choice && me.popup.choice == 'free') {
									me.down('[name=lcls_idcd]').setValue(record.get('clss_idcd'));
									me.finishAction();
								}
							},
							selectionchange : function(grid, records ) {
								var record = records[0],
									class2 = me.down('#cstmclass2').getStore(),
									class3 = me.down('#cstmclass3').getStore(),
									class4 = me.down('#cstmclass4').getStore()
								;
								class2.loadData([],false);
								class3.loadData([],false);
								class4.loadData([],false);

								if (record) {
									me.down('[name=lcls_idcd]').setValue(record.get('clss_idcd'));
									me.selectRecord( record);
									var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_idcd : record.get('clss_idcd') }, me.popup.params);
									class2.load({
										params:{param:JSON.stringify(param)},scope: me,
										callback: function(records, operation, success) {
											if (!success) {
											}
										}
									});
								}
							}
						}
					},{	xtype		: 'grid-panel',
						itemId		: 'cstmclass2' ,
						flex		: 2.5 ,
						style		: Const.borderLine.left + Const.borderLine.right,
						border		: 0  ,
						margin		: '0 1 0 0' ,
						defaults	: {style: 'text-align:center'},
						viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
						store		: Ext.create( me.store ),
						columns		: [{ text: Language.get('class_2','중분류') , dataIndex: 'clss_name',  flex : 1  }],
						listeners	: {
							itemclick : function (dv, record, item, index, e) {
								me.down('[name=mcls_idcd]').setValue(record.get('clss_idcd'));
								me.selectRecord( record);
							},
							itemdblclick: function(dataview, index, item, e) {
								if (me.popup.choice && me.popup.choice == 'free') {
									me.down('[name=mcls_idcd]').setValue(record.get('clss_idcd'));
									me.finishAction();
								}
							},
							selectionchange : function(grid, records ) {
								var record = records[0],
									class3 = me.down('#cstmclass3').getStore()
									class4 = me.down('#cstmclass4').getStore()
								;
								class3.loadData([],false);
								class4.loadData([],false);
								if (record) {
									me.down('[name=mcls_idcd]').setValue(record.get('clss_idcd'));
									me.selectRecord( record);
									var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_idcd : record.get('clss_idcd') }, me.popup.params);
									class3.load({
										params:{param:JSON.stringify(param)},scope: me,
										callback: function(records, operation, success) {
											if (!success) {
											}
										}
									});
								}
							}
						}
					},{	xtype		: 'grid-panel',
						itemId		: 'cstmclass3' ,
						flex		: 2.5 ,
						style		: Const.borderLine.left + Const.borderLine.right,
						border		: 0  ,
						margin		: '0 1 0 0' ,
						defaults	: {style: 'text-align:center'},
						viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
						store		: Ext.create( me.store ),
						columns		: [{ text: Language.get('class_3','소분류') , dataIndex: 'clss_name',  flex : 1  }],
						listeners	: {
							itemclick : function (dv, record, item, index, e) {
								me.down('[name=scls_idcd]').setValue(record.get('clss_idcd'));
								me.selectRecord( record);
							},
							itemdblclick: function(dataview, index, item, e) {
								if ((me.popup.choice && me.popup.choice == 'free') || me.down('#cstmclass4').hidden) {
									me.down('[name=scls_idcd]').setValue(index.get('clss_idcd'));
									me.finishAction();
								}
							},
							selectionchange : function(grid, records ) {
								var record = records[0],
									lister = me.down('#cstmclass4')
								;
								if(record){
									me.down('[name=scls_idcd]').setValue(record.get('clss_idcd'));
									if (!lister.hidden) {
										var class4 = lister.getStore();
										class4.loadData([],false);
										me.selectRecord( record);
										var param = Ext.merge({ hq_id : record.get('hq_id'), prnt_idcd : record.get('clss_idcd') }, me.popup.params);
										class4.load({
											params:{param:JSON.stringify(param)},scope: me,
											callback: function(records, operation, success) {
												if (!success) {
												}
											}
										});
									}
								}
							}
						}
					},{	xtype		: 'grid-panel',
						itemId		: 'cstmclass4' ,
						hidden		: (_global.item_class < 4),
						flex		: 2.5 ,
						border		: 0  ,
						style		: Const.borderLine.left,
						defaults	: {style: 'text-align:center'},
						viewConfig	: { loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }) },
						store		: Ext.create( me.store ),
						columns		: [{ text: Language.get('class_4','여유분류') , dataIndex: 'clss_name',  flex : 1  }],
						listeners	: {
							itemclick : function (dv, record, item, index, e) {
								me.selectRecord( record);
							},
							itemdblclick: function(dataview, index, item, e) {
								me.finishAction();
							},
							selectionchange : function(grid, records ) {
								var record = records[0]
								;
								if (record) {
									me.selectRecord( record);
								}
							},
							render: function(){
								var me = this
								;
								new Ext.util.KeyMap({
									target		: me.getEl(),
									eventName	: 'keyup',
									binding		: [
										{	key: Ext.EventObject.ENTER,
											fn: function(key,e){
												me.fireEvent('itemdblclick', me.getView() );
											}
										}
									]
								});
							}
						}
					}
				]
			}
		;
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{	xtype	: 'container',
							border	: 0,
							style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
							region	: 'center',
							flex	: 1,
							height	: 40,
							margin	: '0 5 0 1',
							items	: [
								{	xtype	: 'fieldset',
									border	: 3,
									flex	: 1,
									style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
									region	: 'center',
									height	: 34,
									margin	: '3 0 0 0',
									layout	: 'hbox',
									items	: [
										{	xtype	: 'label',
											text	: 'SEARCH  | ',
											margin	: '7 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											value	: me.popup.params.find,
											flex	: 1,
											emptyText	: '찾을 코드 또는 코드명을 입력하세요....',
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == 9) {
														var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
														searchButton.fireEvent('click', searchButton);					 /* 조회버튼 Click */
													}
												},
											}
										}
									]
								},
							]
						},
						{	xtype : 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout	: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items	:	[] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},

	/**
	 *
	 */
	finishTool : function() {
		var me = this,
			tool = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				itemId	: 'finishtool' ,
				items	: [
					{xtype: 'textfield' , name : 'clss_desc' ,  height : 22,  flex  : 1 , readOnly : true , fieldCls   : 'readonlyfield' },'-',
					{xtype: 'textfield' , name : 'clss_idcd' , hidden : true , readOnly : true  },
					{xtype: 'textfield' , name : 'lcls_idcd' , hidden : true , readOnly : true  },
					{xtype: 'textfield' , name : 'mcls_idcd' , hidden : true , readOnly : true  },
					{xtype: 'textfield' , name : 'scls_idcd' , hidden : true , readOnly : true  },
					{xtype: 'button'    , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button'    , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
				]
			}
		;
		return tool;
	},

	/**
	 * 조회
	 */
	selectAction: function(){
		var me = this,
			store = me.down('#cstmclass1').getStore(),
			param = Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
			}, me.popup.params );
		;
		param.prnt_idcd = '0' ;

		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
				me.down('#cstmclass1').getSelectionModel().select(0);
			}
		});
	},

	selectRecord : function( record ) {
		var me = this;
		if (record) {
			me.choiceRecord = record ;
			base = me.down('#finishtool');
			base.down('[name=clss_desc]').setValue(record.get('clss_desc'));
		}
	},
	/**
	 * 확인 버튼 이벤트
	 * 분류4의 선택 값이 있을 경우에만 반환
	 */
	finishAction: function(){
		var me = this,
			panel = me.down('#cstmclass4'),
			selected = panel.getSelectionModel().getSelection(),
			base = me.down('#finishtool')
		;
		if ((me.popup.choice && me.popup.choice == 'free') || panel.hidden) {
			if (me.choiceRecord) {
				me.choiceRecord.set('lcls_idcd', base.down('[name=lcls_idcd]').getValue());
				me.choiceRecord.set('mcls_idcd', base.down('[name=mcls_idcd]').getValue());
				me.choiceRecord.set('scls_idcd', base.down('[name=scls_idcd]').getValue());
				me.setResponse([me.choiceRecord]);
			} else {
				resource.showError( '분류를 선택 하여 주시기 바랍니다.'  );
			}
		} else {
			if (selected.length === 0) {
				resource.showError( '최종 분류를 선택 하여 주시기 바랍니다.'  );
			} else {
				Ext.each(selected , function(record) {
					record.set('lcls_idcd', base.down('[name=lcls_idcd]').getValue());
					record.set('mcls_idcd', base.down('[name=mcls_idcd]').getValue());
					record.set('scls_idcd', base.down('[name=scls_idcd]').getValue());
				});
				me.setResponse(selected);
			}
		}
	}
});
