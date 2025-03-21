/**
 */
Ext.define('lookup.popup.view.CstmPopup', { extend: 'Axt.popup.Search',
	id		: 'lookup-cstm-popup',
	alias	: 'widget.lookup-cstm-popup',
	store	: 'lookup.popup.store.CstmPopup',
	requires: [
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.CstmCodeAddPopup'
	],

	title	: '거래처 코드 찾기',
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this
			tema	= '';
		;
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}

		//  품목이 즉시 검색 되는 경우
//		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')) {
//			autoSelect = true ;
//			if (me.popup.option.direct_result) {
//				console.debug( )
//				me.autoShow = false;
//			}
//		}
//		if(me.popup.params.item_name){
//			autoSelect=true;
//		}

		me.items = [me.createForm()];
		me.callParent(arguments);
		if(me.popup.params.find){
			me.selectAction();
		}
		if	(_global.options.cstm_popp_auto|| me.popup.params.find || me.popup.params.cstm_name) {
			me.selectAction();
		}
	},


	/**
	 * 화면폼
	 */
	createForm: function(){
		var  me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},
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
										height	: 38,
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
														flex	: 1,
														emptyText	: '코드 또는 코드명을 입력하세요....',
												 		enableKeyEvents : true,
												 		value	: me.popup.params.find,
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
//							},{
//								xtype : 'container'  , layout: 'border', border : 0 , height: 1  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
							}
						],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '2 0 2 22',
					items	: [
						{	fieldLabel	: '분류 항목'	,
							xtype		: 'popupfield',
							width		: 610,
							name		: 'clss_desc',
							pair		: '',
							margin		: '0 5 0 0',
							clearable	: false ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-clss-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('clss_desc'));
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
								}
							}
						},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
		return form;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	 createGrid: function(){
		var  me = this,
			grid = {
				xtype   : 'grid-panel',
				header  : false,
				region  : 'center',
				viewConfig: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				cls: tema,
				selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store   : Ext.create( me.store ),
				paging:{
					xtype: 'grid-paging',
					items:[
							{	text	: '<span class="write-button">추가</span>',
									name	: 'inputBtn',
									xtype	: 'button',
									width	: 50,
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										var	mod = '',cstm_name = ''
											cstm_idcd = '',
											cstm_code = '',
											acct_name='',acct='',
											invc	= "",
											code	= ""

										;
										if(me.popup.params.cstm_name){
											cstm_name= me.popup.params.cstm_name;
										}
										if(me.popup.params.cstm_idcd){
											cstm_idcd = me.popup.params.cstm_idcd;
										}
										if(me.popup.params.cstm_code){
											cstm_code = me.popup.params.cstm_code;
										}
										if(me.popup.params.acct){
											acct = me.popup.params.acct
										}
										Ext.Ajax.request({
											url		: _global. location.http () + '/listener/seq/maxid.do',
											method	: "POST",
											params	: {
												token : _global. token_id ,
												param : JSON. stringify({
													stor_id		: _global.stor_id,
													table_nm	: 'cstm_mast'
												})
											},
											async	: false,
											success : function(response, request) {
												var object = response,
													result = Ext.decode(object.responseText)
												;
												cstm_idcd = result.records[0].seq;
												console.log(result.records[0].seq);
												},
											failure : function(response, request) {
												resource.httpError(response);
											},
											callback : function() {
											}
										});

										mod = 'module-cstmcode-add-popup';
//								cstm_name = Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').getValue();

								resource.loadPopup({
									widget : mod,
									params : {cstm_idcd:cstm_idcd },
									result : function(records) {
//										Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').setValue(records.values.cstm_code);
										me.selectAction();
										console.log(cstm_idcd);
									}
								});
								Ext.ComponentQuery.query('#cstm_idcd')[0].setValue(cstm_idcd);
								Ext.ComponentQuery.query('#cstm_code')[0].setValue(cstm_idcd);


//										Ext.Ajax.request({
//											url		: _global. location.http () + '/listener/seq/maxid.do',
//											method	: "POST",
//											params	: {
//												token : _global. token_id ,
//												param : JSON. stringify({
//													stor_id		: _global.stor_id,
//													table_nm	: 'cstm_mast'
//												})
//											},
//											async	: false,
//											success : function(response, request) {
//												var object = response,
//													result = Ext.decode(object.responseText)
//												;
//												cstm_idcd = result.records[0].seq;
//												console.log(result.records[0].seq);
//												},
//											failure : function(response, request) {
//												resource.httpError(response);
//											},
//											callback : function() {
//											}
//										});
//											mod = 'module-cstmcode-add-popup';
////											console.log(me.popup.params.cstm_code);
////										cstm_name = Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').getValue();
//
//										resource.loadPopup({
//											widget : mod,
//											params : { acct	: acct, cstm_name : cstm_name,cstm_idcd:cstm_idcd,cstm_code:cstm_code,acct_name:acct_name },
//											result : function(records) {
////												Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').setValue(records.values.cstm_code);
//												me.selectAction();
//											}
//										});
									},
									cls		: 'button1-style',
									hidden	: false
								},'-',
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	text : Language.get( 'buss_numb'	, '사업자등록번호'   )	, dataIndex: 'buss_numb'	, width : 100, align : 'center', hidden : _global.stor_id.toUpperCase() == 'N1000DAE-A1000',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'cstm_name'	, '거래처명'   )	, dataIndex: 'cstm_name'	, flex : 1,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'boss_name'	, '대표자'  )		, dataIndex: 'boss_name'	, width: 90, hidden : _global.stor_id.toUpperCase() == 'N1000DAE-A1000',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'tele_numb'	, '전화번호'  )	, dataIndex: 'tele_numb'	, width: 90, hidden : _global.stor_id.toUpperCase() == 'N1000DAE-A1000',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'cstm_code'	, '거래처코드'  )	, dataIndex: 'cstm_code'	, width: 100,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 140;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'cstm_idcd'		, '거래처id'	)	, dataIndex: 'cstm_idcd'		, width: 100 , hidden : true
					}

				],
				 listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					afterrender: function(){
						var	me		= this,
							popup	= me.ownerCt.ownerCt
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{
								key: Ext.EventObject.ENTER ,
								fn: function(key,e) {
									if(popup.enterDelay===true){
										popup.enterDelay = false;
										return;
									}else{
										me.fireEvent('itemdblclick', me.getView());
									}
								}
							}]
						});
					}
				}
			}
		;
		return grid;
	},
	/**
	 * 조회
	 */
	selectAction: function(){
		var  me    = this,
			grid = me.down('grid'),
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			 params:{param:JSON.stringify(param)}, scope:me,
			 callback:function(records, operation, success) {
				 if(records){
//					me.down('grid').getSelectionModel().select(0);
//					if (records.length === 1) {
//						me.finishAction();
//					}
					if(_global.hqof_idcd.toUpperCase()== 'N1000DAE-A' || _global.hqof_idcd.toUpperCase()== 'N1000LIEBE' || _global.hqof_idcd.toUpperCase()== 'N1000IYPKG'){
						grid.getSelectionModel().select(0);
						if (records.length === 1) {
							me.finishAction();
						}
					}
					if(me.popup.params.select){
						grid.getSelectionModel().select(0);
					}
				}
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var  me    = this,
			 panel = me.down('grid'),
			 selected = panel.getSelectionModel().getSelection()
		;
		if (selected.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			me.setResponse(selected);
		}
	}
});
