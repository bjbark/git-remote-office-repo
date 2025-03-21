/**
 */
Ext.define('lookup.popup.view.ItemPopupSjung', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-item-popup-sjung',
	store	: 'lookup.popup.store.ItemPopup',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.ItemCodeAddPopup',
		'lookup.popup.view.ItemCodeAddPopup2',
		'lookup.popup.view.ItemCodeAddPopup3'
	],
	title	: Language.get('item_popup','품목 찾기'),
	closable: true,
	autoShow: true,

	width	: 800,
	height	: 550,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this,
			autoSelect = false
			tema	= ''
		;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}

		//  품목이 즉시 검색 되는 경우
		if ((me.popup.values.barcode && me.popup.values.barcode != '') || (me.popup.values.item_name && me.popup.values.item_name != '')) {
			autoSelect = true ;
			if (me.popup.option.direct_result) {
				console.debug( )
				me.autoShow = false;
			}
		}
		if(me.popup.params.item_name){
			autoSelect=true;
		}

		me.items = [me.createForm(tema)];
		me.callParent(arguments);

		/* 공통품목수신 버튼 표시 여부 */
		if ( me.popup.option.bonsa_item_recv ) {
			me.down('[name=commonBtn]').setVisible(true);
		}
		if	(_global.options.item_popp_auto || me.popup.params.find || me.popup.params.item_name) {
			me.selectAction();
		}
		/* 품목의 조회 조건을 숨기고자 하는 목록을 받아 숨김 처리 한다. */
		var hiddenlist = me.popup.hidden;
		Ext.each(hiddenlist, function(record, index) {
			me.down('[name='+record+']').setVisible(false);
		});
	},

	/**
	 * 화면폼
	 */
	 createForm: function(tema){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.searchForm() ],
				items		: [ me.createTabs() ]
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
			cls			: tema,
			id			: 'search',
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
										},{	xtype	: 'lookupfield',
											name	: 'revs_dvcd',
											editable: false,
											width	: 100,
											lookupValue	: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? resource.lookup('revs_dvcd') : resource.lookup('').concat(resource.lookup('revs_dvcd').slice(0,1)),
											value	: '1',
											margin	: '3 5 0 0',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '품목코드 또는 품명을 입력하세요....',
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
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items :	[] // 기타 검색 조건이 필요한 경우
		};
		return form;
	},


	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				split		: true,
				itemId		: 'grid1',
				flex		: 2.5,
				border		: 1,
				height		: 460,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
					markDirty: false,
				},
				plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'SINGLE' },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							width	: 50,
							margin	: '3 0 3 0',
							items	: [
								{	text	: '<span class="write-button">추가</span>',
									name	: 'inputBtn',
									xtype	: 'button',
									handler	: function (grid, rowIndex, colIndex, item, e, record) {
										var	mod = '',item_name = ''
											mngt_sbsc_valu = '',
											mngt_sbsc_idcd = '',
											acct_name='',acct=''
										;
										if(me.popup.params.mngt_sbsc_valu){
											mngt_sbsc_valu= me.popup.params.mngt_sbsc_valu;
										}
										if(me.popup.params.mngt_sbsc_idcd){
											mngt_sbsc_idcd = me.popup.params.mngt_sbsc_idcd;
										}
										if(me.popup.params.acct_name){
											acct_name = me.popup.params.acct_name
										}
										if(me.popup.params.acct){
											acct = me.popup.params.acct
										}
										if(_global.options.mes_system_type =='Frame'){
											mod = 'module-itemcode-add-popup2';
										}else if(_global.hq_id=='N1000cscin'||_global.hq_id=='N1000hntop'){
											mod = 'module-itemcode-add-popup3';
										}else{
											mod = 'module-itemcode-add-popup';
										}
										item_name = Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').getValue();

										resource.loadPopup({
											widget : mod,
											params : { acct	: acct, item_name : item_name,mngt_sbsc_valu:mngt_sbsc_valu,mngt_sbsc_idcd:mngt_sbsc_idcd,acct_name:acct_name },
											result : function(records) {
												Ext.ComponentQuery.query('#search')[0].down('[name=find_name]').setValue(records.values.item_code);
												me.selectAction();
											}
										});

									},
									cls		: 'button1-style',
									hidden	: true
								}
							]
						},'-',
						'->' ,
					]
				},
				columns: [
					{	xtype: 'rownumberer'		, width:  50, text: '순번', align : 'center', hidden : _global.hq_id.toUpperCase() == 'N1000NBOLT'? false : true,
					},{	dataIndex:	'line_stat'	, width:  50, align : 'center' , text: Language.get( 'line_stat'      , '상태'	) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ), value : '2',
						hidden	: true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return resource.lookup( 'line_stat' )[value][2];
						}
					},{	dataIndex:	'acct_bacd_name'	, width:  60, align : 'center' , text: Language.get( 'acct_bacd_name'      , '계정구분'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 110;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'item_code'	, align : 'center' , text: Language.get( 'item_code'      , '품목코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						width : 75
					},{	dataIndex:	'item_name'	, align : 'left'   , text: Language.get( 'item_name'      , '품명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 500;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						width: 145
					},{	dataIndex:	'item_spec'	, width: 110, align : 'left'   , text: Language.get( 'item_spec'      , '품목규격'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					}
				],
				listeners: {
					selectionchange : function(grid, records ) {
						var record = records[0],
						class2 = me.down('#grid2').getStore()
					;
					
					// 23.11.15 - 이강훈 - 품목게정에 따라 배합비 버전을 가지고 오도록 revs_dvcd 추가
					class2.loadData([],false);
						if (record) {
							me.selectRecord( record);
							var revs_dvcd = (record.get('acct_bacd') == '2003') ? "2" : "1";
							var param =  Ext.merge({ item_idcd : record.get('item_idcd')}, me.popup.params, {revs_dvcd : revs_dvcd});

							class2.load({
								params:{param:JSON.stringify(param)},scope: me,
								callback: function(records, operation, success) {
									if (!success) {
									}
								}
							});
						}
					}
				},
//				listeners: {
//					itemdblclick: function(dataview, index, item, e) {
//						param= index.data.item_idcd;
//						me.selectDetail(param);
//					}
//				}
//				listeners: {
//					itemdblclick : function(grid, records ) {
//						var record = records[0],
//						class2 = me.down('#grid2').getStore()
//					;
//					class2.loadData([],false);
//						if (record) {
//							me.selectRecord( record);
//
//							var param =  Ext.merge({ item_idcd : record.get('item_idcd') }, me.popup.params);
//							class2.load({
//								params:{param:JSON.stringify(param)},scope: me,
//								callback: function(records, operation, success) {
//									if (!success) {
//									}
//								}
//							});
//						}
//					}
//				}
			};
		return grid;
	},

	createTab:function(){
		var me = this,
		item = {
			xtype		: 'panel',
			header		: false,
			width		: 20,
			height		: 460,
			border		: 0,
			items	: [

			]
		}
		return item;
	},
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'panel',
				region	: 'center',
				layout	: 'hbox',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createGrid(),me.createTab(),me.createGrid2(),me.createGrid3() ]
			}
		;
		return tabs;
	},
	createGrid2: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				itemId		: 'grid2',
				header		: false,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				flex		: 1.8,
				height		: 460,
				border		: 1,
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'  },
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'-' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					],pagingButton : false
				},
				store		: Ext.create( 'lookup.popup.store.ItemPopupSjung' ),
				itemId		: 'grid2',
				name		: 'grid2',
				columns: [
					{	dataIndex:	'revs_numb'	, width:  50, align : 'center' , text: Language.get( 'revs_numb'      , '리비전'	),
					},{	dataIndex:	'item_idcd'	, width:  95, align : 'center' , text: Language.get( 'item_idcd'      , '품목id'),hidden:true,
					},{	dataIndex:	'adpt_date'	, width:  95, align : 'center' , text: Language.get( 'adpt_date'      , '적용일자'),
					},{	dataIndex:	'befr_splr_name', width:  150, align : 'center' , text: Language.get( 'befr_splr_name'  , '(전)공급사')
					},{	dataIndex:	'item_code'	, flex : 1, align : 'left'   , text: Language.get( 'item_code'      , '상위품명'	),hidden:true,
					},{	dataIndex:	'item_name'	, flex : 1, align : 'left'   , text: Language.get( 'item_name'      , '품목이름'	),hidden:true,
					},{	dataIndex:	'item_spec'	, flex : 1, align : 'left'   , text: Language.get( 'item_spec'      , '품목규격'	),hidden:true,
					}
				],
				listeners: {
					selectionchange : function(grid, records ) {
						var record = records[0],
						class2 = me.down('#grid3').getStore()
					;
					class2.loadData([],false);
						if (record) {
							me.selectRecord( record);

							var param =  Ext.merge({ item_idcd : record.get('item_idcd') , revs_numb : record.get('revs_numb') }, me.popup.params, {revs_dvcd : record.get('revs_dvcd')});
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
//				listeners: {
//					itemdblclick: function(dataview, index, item, e) {
//					me.finishAction();
//				},
//					render: function(){
//						var me = this
//						;
//						new Ext.util.KeyMap({
//							target: me.getEl(),
//							eventName : 'keyup',
//							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
//						});
//					}
//				},
			};
		return grid;
	},

	createGrid3: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				itemId		: 'grid3',
				header		: false,
				hidden		: true,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				flex		: 5,
				height		: 460,
				border		: 1,
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'  },
				store		: Ext.create( 'lookup.popup.store.ItemPopupSjung' ),
				itemId		: 'grid3',
				name		: 'grid3',
				columns: [
					{	dataIndex:	'revs_numb'	, width:  50, align : 'center' , text: Language.get( 'revs_numb'      , '리비전'	),
					},{	dataIndex:	'adpt_date'	, width:  95, align : 'center' , text: Language.get( 'adpt_date'      , '적용일자'),
					},{	dataIndex:	'item_code'	, flex : 1, align : 'left'   , text: Language.get( 'item_code'      , '상위품명'	),hidden:true,
					},{	dataIndex:	'item_name'	, flex : 1, align : 'left'   , text: Language.get( 'item_name'      , '품목이름'	),hidden:true,
					},{	dataIndex:	'item_spec'	, flex : 1, align : 'left'   , text: Language.get( 'item_spec'      , '품목규격'	),hidden:true,
					}
				],
			};
		return grid;
	},


	/**
	 * 조회
     * 2023.11.15 - 이강훈 - 검색조건에 생산/품목보고 조건추가되어 검색되도록 변경
	 */
	selectAction: function(){
		var me = this,
			store = me.down('grid').getStore(),
			acct_bacd = (me.down('[name=revs_dvcd]').getValue() == 1) ? "생산품" : "품목보고서",
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id, acct_bacd : acct_bacd});
		
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				if (success && me.popup.option.direct_result && records.length === 1) {
				} else {
					if(!me.autoShow) {
						me.autoShow = !me.autoShow;
						me.show();
					}
				}
			}
		});
	},

	selectDetail: function(param){
		var me = this,
			store2 = me.down('#grid2').getStore();

		store2.load({
			params		: {
				token	: _global.token_id,
				param	:	JSON.stringify({
					item_idcd		: param,
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			}
		});
	},

	selectRecord : function( record ) {
		var me = this;
		if (record) {
			me.choiceRecord = record ;
			base = me.down('#grid2');
		}
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me = this,
			owner	= Ext.ComponentQuery.query('lookup-item-popup-sjung')[0],
			grid	= owner.down('#grid3'),
			grid2	= owner.down('#grid2'),
			store	= grid.getStore();
			store2	= grid.getStore();
			selects = store.data.items,
			selects2 = store2.data.items,
			request = []
		;
		console.log(selects2);
		if ( selects.xtype ){
			selects2 = grid.getSelectionModel().getSelection() ;
		}
		if (selects2.length === 0) {
			resource.showError( '리비전을 선택해주세요.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						item_idcd : eachrow.get('item_idcd'),
					});
				});
				var store = Ext.create(me.store );
					param = Ext.merge( me.popup.params, {
						records : request
					});
					store.getProxy().api.read = me.popup.apiurl.master ;
					store.load({
						params   : {param:JSON.stringify(param)},
						scope    : me,
						callback : function(records, operation, success) {
							if (success) {
								me.setResponse(records);
							}
					}
					});
			} else {
				me.setResponse(selects);
			}
		}
	}
});

