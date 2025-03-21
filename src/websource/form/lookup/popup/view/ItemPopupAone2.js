/**
 */
Ext.define('lookup.popup.view.ItemPopupAone2', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-item-popup-aone2',
	store	: 'lookup.popup.store.ItemPopupAone',
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

	width	: 1100,
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

		console.log(me.popup.params.acct_bacd);
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
		/* 품목 추가 버튼 */
		if	(me.popup.params.add == '1') {
			me.down('[name=inputBtn]').setVisible(true);
		}
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
							style : 'background:url("../../../resource/img/btn_search_icon.png")'
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
				flex		: 6,
				border		: 1,
				height		: 460,
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
					markDirty: false,
				},
				plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{
			        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
			        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
			        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
			    }],
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'MULTI' },
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							width	: 50,
							margin	: '3 0 3 0',
							hidden	: true,
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
								}
							]
						},'-',
						'->' ,
					]
				},
				columns: [
				       {dataIndex:	'line_stat'	, width:  50 , align: 'center' , text: Language.get( 'line_stat' , '상태'	) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),
						hidden	: true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return resource.lookup( 'line_stat' )[value][1];
						}
					},{dataIndex:	'acct_bacd_name' , width: 75 , align: 'center' , text: Language.get( 'acct_bacd_name' , '계정구분'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 110;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'item_code'	, width: 95 , align: 'center' , text: Language.get( 'item_code' , '품목코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'item_name'	, width: 180 , align: 'left' , text: Language.get( 'item_name' , '품명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 500;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},

					},{	dataIndex:	'cont_pric'	, width: 85 , align: 'right'  , text: Language.get( 'cont_pric' , '계약단가'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 85;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							var val = Ext.util.Format.number(value, _global.options.mes_system_type == 'SJFLV' ? "0,000.00" : "0,000");
							return val;
						},
						hidden: true,
					},{	dataIndex:	'mtrl_bacd_name' , width: 100 , align: 'left' , text: Language.get( 'mtrl_bacd_name' , '재질'	),
							renderer: function(value, meta){
								if(me.popup.params.tema){
									this.columns[4].width = 160;
									meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
								}
								return value;
							},
						hidden: true,
					},{	dataIndex:	'item_spec'	, width: 150 , align: 'left' , text: Language.get( 'item_spec' , '품목규격'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						hidden : true,
					},{	dataIndex:	'modl_name'	, width: 100 , align: 'left' , text: Language.get( 'modl_name' , '모델명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[6].width = 160;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						},
						hidden : true,
					},{	dataIndex:	'lcls_name'	, width: 80 , align: 'left' , text: Language.get( 'lcls_name' , '대분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[7].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'mcls_name'	, width: 80 , align: 'left' , text: Language.get( 'mcls_name' , '중분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[8].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'scls_name'	, width: 80 , align: 'left' , text: Language.get( 'scls_name' , '소분류'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'item_clss_bacd_name' , width: 80 , align: 'left' , text: Language.get( 'item_clss_bacd_name' , '품목군'	),
						renderer: function(value, meta){
							debugger;
							if(me.popup.params.tema){
								this.columns[5].width = 85;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						hidden : true,
					},{	dataIndex:	'item_idcd'	, width:  80, align : 'left'   , text: Language.get( 'item_idcd'      , '품목id'	), hidden : true
					},{	dataIndex:	'pack_qntt'	, width:  80, align : 'right'  , text: Language.get( 'pack_qntt'      , '패킹단위'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 120;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							return value;
						},
						hidden : true,
					},{	dataIndex:	'stok_qntt'	, width:  80, align : 'right'  , text: Language.get( 'stok_qntt'      , '재고량'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;width:120px;'; // applied style for DIV element
							}
							var val = Ext.util.Format.number(value, _global.options.mes_system_type == 'SJFLV' ? "0,000.00000" : "0,000");
							return val;
						},
						hidden : true
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.insert();
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
			};
		return grid;
	},
	createTab:function(){
		var me = this,
		item = {
			xtype		: 'panel',
			header		: false,
			width		: 100,
			height		: 460,
			border		: 0,
			items	: [
				{	xtype	: 'button',
					text	: '<span class="btnTemp">></span>',
					cls		: 'button-style',
					margin	: '180 0 0 10',
					width	: 100,
					height	: 50,
					width	: 80,
					handler	: me.insert,
				},{	xtype	: 'button',
					handler	: me.remove,
					text	: '<span class="btnTemp"><</span>',
					cls		: 'button-style',
					margin	: '20 0 0 10',
					width	: 100,
					height	: 50,
					width	: 80
				}
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
				items	: [ me.createGrid(),me.createTab(),me.createGrid2() ]
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
				flex		: 4,
				height		: 460,
				border		: 1,
				cls			: tema,
				selModel: {	selType: 'checkboxmodel', mode : 'MULTI'  },
				store	: Ext.create('lookup.popup.store.ItemPopupDetail'),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex:	'line_stat'	, width:  50, align : 'center' , text: Language.get( 'line_stat' , '상태'	) , xtype: 'lookupcolumn' , lookupValue: resource.lookup( 'line_stat' ),
						hidden	: true,
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return resource.lookup( 'line_stat' )[value][1];
						}
					},{	dataIndex:	'acct_bacd_name' , width:  75 , align : 'center' , text: Language.get( 'acct_bacd_name' , '계정구분'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 110;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'item_code'	, width:  95 , align : 'center' , text: Language.get( 'item_code' , '품목코드'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 220;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_name'	, flex : 1, align : 'left' , text: Language.get( 'item_name' , '품명'	),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 500;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						}
					},{	dataIndex:	'item_spec'	, width: 110 , align : 'left' , text: Language.get( 'item_spec' , '품목규격'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
					},{	dataIndex:	'pack_qntt'	, width: 80, align : 'right' , text: Language.get( 'pack_qntt' , '패킹단위'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							return value;
						},
						hidden : true
					},{	dataIndex:	'stok_qntt'	, width: 80 , align : 'right' , text: Language.get( 'stok_qntt' , '재고량'),
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 260;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px'; // applied style for DIV element
							}
							var val = Ext.util.Format.number(value, _global.options.mes_system_type == 'SJFLV' ? "0,000.00000" : "0,000");
							return val;
						},
						hidden : true
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.remove();
					},
					render: function(){
						var me = this
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
						});
					}
				}
			};
		return grid;
	},
	/**
	 * 조회
	 */
	selectAction: function(){
		var me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), me.popup.params , {hq_id : _global.hq_id, mes_system_type : _global.options.mes_system_type});
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
	insert:function(){
		var	me = this,
			owner	= Ext.ComponentQuery.query('lookup-item-popup-aone2')[0],
			grid1	= owner.down('[itemId=grid1]'),
			select	= grid1.getSelectionModel().getSelection(),
			grid2	= owner.down('[itemId=grid2]'),
			store	= grid2.getStore()
		;
		var chk = 1;
		if(select){
			if(_global.hq_id.toUpperCase() == "N1000NBOLT"){
				var seq = 1,
					record = [],
					maxseqn = 0
				;
				grid1.getSelectionModel().deselectAll();
				store.each(function(rec){
					if(maxseqn < rec.get("line_seqn")){
						maxseqn = rec.get("line_seqn");
					}
				});
				maxseqn++;

				for (var i = 0; i < select.length; i++) {
					record = Ext.create( store.model.modelName , {
						line_seqn		: maxseqn,
						item_idcd		: select[i].get('item_idcd'),
						item_code		: select[i].get('item_code'),
						item_name		: select[i].get('item_name'),
						item_spec		: select[i].get('item_spec'),
						item_stnm		: select[i].get('item_stnm'),
						unit_idcd		: select[i].get('unit_idcd'),
						unit_name		: select[i].get('unit_name'),
						acct_bacd_name	: select[i].get('acct_bacd_name'),
						invc_qntt		: 1,
						cont_pric		: select[i].get('cont_pric')
					});
					store.add(record);
				}
			}else{
				store.each(function(rec){
					for (var i = 0; i < select.length; i++) {
						if(rec.get('item_idcd')==select[i].get('item_idcd')){
							chk = 0;
						}
					}
				});
				if(chk){
					grid1.getSelectionModel().deselectAll();
					store.add(select);
				}else{
					Ext.Msg.alert('알림','이미 등록된 품목입니다.')
				}
			}
		}
	},

	remove:function(){
		var	me = this,
			owner	= Ext.ComponentQuery.query('lookup-item-popup-aone2')[0],
			grid1	= owner.down('[itemId=grid1]'),
			grid2	= owner.down('[itemId=grid2]'),
			select	= grid2.getSelectionModel().getSelection(),
			store	= grid2.getStore()
		;
		if(select){
			store.remove(select);
		}
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me = this,
			grid	= me.down('[itemId=grid2]'),
			acpt_item = me.popup.params.acpt_item,
			store	= grid.getStore(),
			selects = store.data.items,
			request = []
		;
		if ( selects.xtype ){
			selects = grid.getSelectionModel().getSelection() ;
		}
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						item_idcd : eachrow.get('item_idcd')
					});
				});
					param = Ext.merge( me.popup.params, {
						records : request
					});
					store.getProxy().api.read = me.popup.apiurl.master ;
					store.load({
						params   : {param:JSON.stringify(param)},
						scope    : me,
						callback : function(records, operation, success) {
							if (success) {
//	임시로 막아둔다.. 향후 조건에 따라 조정 가능 함(2019.06.10 pbj)
//								records.forEach( function( data ) {
//									if ( !Ext.isEmpty( data.get('item_ds') ) ) { /* item_ds 값이 있으면 */
//										data.set('item_name', data.get('item_ds') );
//									} else {
//										var brand_nm = data.get('brand_nm');
//										if (brand_nm) {
//											if (brand_nm != ""){
//												data.set('item_name', data.get('brand_nm')+"/"+data.get('item_name') );
//											}
//										}
//									}
//								});
								me.setResponse(records);
							}
					}
					});
			} else {
				for(var i=0;i<selects.length;i++){
					if(selects[i].data.item_idcd == acpt_item){
						Ext.Msg.alert("알림","사용할 수 없는 품목입니다.");
						return;
					}
				}
				me.setResponse(selects);
			}
		}
	}
});

