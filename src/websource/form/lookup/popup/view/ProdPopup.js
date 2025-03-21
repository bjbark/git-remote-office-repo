/**
 */
Ext.define('lookup.popup.view.ProdPopup', { extend: 'Axt.popup.Search',
	id		: 'lookup-prod-popup',
	alias	: 'widget.lookup-prod-popup',
	store	: 'lookup.popup.store.ProdPopup',
	requires: [
		'lookup.popup.view.ProdAddPopup',
	],
	title	: '제품코드 찾기',
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
		me.items = [me.createForm()];
		me.callParent(arguments);
		if(me.popup.params.find){
			me.selectAction();
		}
		me.selectAction();
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
				dockedItems	: [ me.searchForm()],
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
											margin	: '5 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '제품코드 또는 제품명을 입력하세요....',
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
				}
			],layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 100, labelWidth : 30, labelSeparator : '' },
			items :	[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '2 0 2 22',
					items	: [
						{	fieldLabel	: Language.get('prod_leng', '장'),
							xtype		: 'numericfield',
							name		: 'prod_leng',
							labelStyle	: 'text-align:right;',
							margin		: '5 0 5 0',
							enableKeyEvents : true,
							listeners	:{
								keydown : function(self, e) {
									console.log(self);
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										me.down('[name=prod_widh]').focus(true , 10)
									}
									this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
										scope: this,
										key: Ext.EventObject.TAB,
										shift:true,
										fn: function () {
											me.down('[name=find_name]').focus(true , 10)
										}
									});
								}
							}
						},{	fieldLabel	: Language.get('prod_widh', '폭'),
							xtype		: 'numericfield',
							name		: 'prod_widh',
							labelStyle	: 'text-align:right;',
							margin		: '5 0 5 0',
							enableKeyEvents : true,
							listeners	:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										me.down('[name=prod_hght]').focus(true , 10)
									}
									this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
										scope: this,
										key: Ext.EventObject.TAB,
										shift:true,
										fn: function () {
											me.down('[name=prod_leng]').focus(true , 10)
										}
									});
								}
							}
						},{	fieldLabel	: Language.get('prod_hght', '고'),
							xtype		: 'numericfield',
							name		: 'prod_hght',
							labelStyle	: 'text-align:right;',
							margin		: '5 0 5 0',
							enableKeyEvents : true,
							listeners	:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										me.selectAction();
									}
									this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
										scope: this,
										key: Ext.EventObject.TAB,
										shift:true,
										fn: function () {
											me.down('[name=prod_widh]').focus(true , 10)
										}
									});
								}
							}
						},{ xtype  : 'button',
							text   : '<span class="write-button">초기화</span>'	,
							cls    : 'button1-style',
							margin : '4 0 2 22',
							handler: function() {
								me.down('[name=prod_widh]').setValue('');
								me.down('[name=prod_leng]').setValue('');
								me.down('[name=prod_hght]').setValue('');

							}
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
				plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
			        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
			        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
			        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
			    } ],
				paging:{
					xtype: 'grid-paging',
					items:[
//						{xtype: 'button' , text : '<span class="write-button">추 가</span>', scope: me, handler: me.insertPopup, cls: 'button-style',width:50},
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	text : Language.get( 'prod_code'	, '제품코드'   )	, dataIndex: 'prod_code'	, width : 150,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'prod_name'	, '제품명'  )		, dataIndex: 'prod_name'	, flex : 1,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 240;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'prod_leng'	, '장'  )	, dataIndex: 'prod_leng'	, width: 50,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'prod_widh'	, '폭'  )	, dataIndex: 'prod_widh'	, width: 50,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'prod_hght'	, '고'  )	, dataIndex: 'prod_hght'	, width: 50,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'user_memo'	, '메모'  )	, dataIndex: 'user_memo'	, width: 50,hidden : true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					}

				],
				 listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					 render: function(){
						var me = this,
							popup	= me.ownerCt.ownerCt
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
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
					grid.getSelectionModel().select(0);
					if (records.length === 1) {
						me.finishAction();
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
	},
	insertPopup:function(){
		var	me = this,
			prod_idcd;
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			params	: {
				token	: _global. token_id ,
				param	: JSON. stringify({
					stor_id	: _global.stor_id,
					table_nm: 'product_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					prod_idcd = result.records[0].seq;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		resource.loadPopup({
			widget : 'module-prod-add-popup',
			params : { prod_idcd : prod_idcd ,prod_code : prod_idcd},
			result : function(records) {
				me.selectAction();
			}
		});
	}
});
