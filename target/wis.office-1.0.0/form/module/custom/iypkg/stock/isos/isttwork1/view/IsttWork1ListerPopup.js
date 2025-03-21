/**
 */
Ext.define('module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1ListerPopup', { extend: 'Axt.popup.Search',
	id		: 'module-isttwork1-lister-lookup-popup',
	alias	: 'widget.module-isttwork1-lister-lookup-popup',
	store	: 'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1ListerPopup',
	requires: [
		'lookup.popup.view.ProdAddPopup',
	],
	title	: '수주관련정보',
	closable: true,
	autoShow: true,
	width	: 850,
	height	: 500,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this
			tema	= '';
		;
		if(me.popup.params.records.tema){
			tema = me.popup.params.records.tema+'grid';
		}

		me.items = [me.createForm()];
		me.callParent(arguments);
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
//			dockedItems	: [
//				{	xtype	: 'toolbar',
//					dock	: 'top',
//					items	: [
//						{	xtype	: 'container',
//							border	: 0,
//							style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
//							region	: 'center',
//							flex	: 1,
//							height	: 38,
//							margin	: '0 5 0 1',
//							items	: [
//								{	xtype	: 'fieldset',
//									border	: 3,
//									flex	: 1,
//									style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
//									region	: 'center',
//									height	: 34,
//									margin	: '3 0 0 0',
//									layout	: 'hbox',
//									items	: [
//										{	xtype	: 'label',
//											text	: 'SEARCH  | ',
//											margin	: '5 10 0 0',
//											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
//										},{	name	: 'find_name',
//											xtype	: 'searchfield',
//											margin	: '3 10 0 0',
//											flex	: 1,
//											emptyText	: '제품코드 또는 제품명을 입력하세요....',
//											enableKeyEvents : true,
//											value	: me.popup.params.find,
//											listeners:{
//												keydown : function(self, e) {
//													if (e.keyCode == e.ENTER || e.keyCode == 9) {
//														var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
//														searchButton.fireEvent('click', searchButton);					 /* 조회버튼 Click */
//													}
//												},
//											}
//										}
//									]
//								},
//							]
//					 	},
//						{	xtype : 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',action : Const.SELECT.action ,
//							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
//						}
//					]
//				}
//			],
			layout: { type: 'vbox' },
			fieldDefaults: { height : 20, width : 150, labelWidth : 50, labelSeparator : '' },
			items :	[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '2 0 2 22',
					items	: [
						{	fieldLabel	: Language.get('', '수주번호'),
							xtype		: 'textfield',
							name		: 'invc_numb',
							value		: me.popup.params.records.invc_numb,
							labelStyle	: 'text-align:right;',
							width		: 160,
							margin		: '5 0 5 0',
							readOnly	: true,
						},{	fieldLabel	: Language.get('', 'P/O NO'),
							xtype		: 'numericfield',
							name		: 'pcod_numb',
							labelStyle	: 'text-align:right;',
							width		: 200,
							margin		: '5 0 5 0',
							readOnly	: true,
						},{	fieldLabel	: Language.get('', '납기일자'),
							xtype		: 'textfield',
							name		: 'deli_date',
							labelStyle	: 'text-align:right;',
							width		: 130,
							margin		: '5 0 5 0',
							readOnly	: true,
						},{	fieldLabel	: Language.get('', '재단 및 스코어'),
							xtype		: 'textfield',
							name		: 'fdat_spec',
							value		: me.popup.params.records.fdat_spec,
							labelStyle	: 'text-align:right;',
							labelWidth	: 80,
							width		: 300,
							margin		: '5 0 5 0',
							readOnly	: true,
						},
					]
				},{ xtype	: 'fieldcontainer',
					layout	: { type: 'hbox', align: 'stretch' },
					height	: 15,
					width	: 500,
					items	:[
						{	xtype	: 'label',
							text	: '일반',
							margin	: '0 0 0 30',
							width	: 50,
						},{	xtype	: 'label',
							margin	: '0 0 0 -25',
							width	: 50,
							style	: 'background-color:black !important;'
						},{	xtype	: 'label',
							text	: '계획',
							margin	: '0 0 0 30',
							width	: 50,
						},{	xtype	: 'label',
							margin	: '0 0 0 -25',
							width	: 50,
							style	: 'background-color:lightblue !important;'
						},{	xtype	: 'label',
							text	: '생산',
							margin	: '0 0 0 30',
							width	: 50,
						},{	xtype	: 'label',
							margin	: '0 0 0 -25',
							width	: 50,
							style	: 'background-color:lightyellow !important;'
						},{	xtype	: 'label',
							text	: '소계',
							margin	: '0 0 0 30',
							width	: 50,
						},{	xtype	: 'label',
							margin	: '0 0 0 -25',
							width	: 50,
							style	: 'background-color:pink !important;'
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
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask }),
					listeners: {
						refresh: function (view) {
							var nodes = view.getNodes();
							for (var i = 0; i < nodes.length; i++) {
								var node = nodes[i];
								var record = view.getRecord(node);
								var cells = Ext.get(node).query('td');
								var tr = Ext.get(node).query('tr');
								for (var j = 0; j < cells.length; j++) {
									if (record.get('rnum') == '3' || record.get('rnum') == '5' || record.get('rnum') == '7') { // 소계
										Ext.fly(cells[j]).setStyle('background-color', 'Pink');
									}
//									if (record.get('rnum') == '5') { // 소계
//										Ext.fly(cells[j]).setStyle('background-color', 'Pink');
//									}
								}
							}
						}
					},
					getRowClass: function (record, index) {
//						if (record.get('rnum') == '3') {
//							return 'text-blue';
//						}
//						if (record.get('rnum') == '5') {
//							return 'text-blue';
//						}
					}
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
//						'->',
//						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
//						'-',
//						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	text : Language.get( 'prgs_cont'	, '진행'  )	, dataIndex: 'prgs_cont'	, width: 80, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[0].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'invc_date'	, '일자'  )	, dataIndex: 'invc_date'	, width: 100, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[1].width = 100;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'cstm_name'	, '상호'  )	, dataIndex: 'cstm_name'	, width: 80, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[2].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'fabc_name'	, '품명 / 원자재명'  )	, dataIndex: 'fabc_name'	, width: 100, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[3].width = 100;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'item_spec'	, '규격'  )	, dataIndex: 'item_spec'	, width: 80, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[4].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'item_fxqt'	, '절  / 개'  )	, dataIndex: 'item_fxqt'	, width: 80, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[5].width = 50;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'istt_qntt'	, '수량'  )	, dataIndex: 'istt_qntt'	, width: 50, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[6].width = 50;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( ''	, '여유'  )	, dataIndex: ''	, width: 50, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[7].width = 50;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'subt_qntt'	, '감량'  )	, dataIndex: 'subt_qntt'	, width: 50, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[8].width = 50;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'unit_name'	, '단위'  )	, dataIndex: 'unit_name'	, width: 50, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[9].width = 50;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					},{	text : Language.get( 'wkun_dvcd'	, '작업단위'  )	, dataIndex: 'wkun_dvcd'	, width: 80, align : 'center',
						renderer: function(value, meta){
							if(me.popup.params.tema){
								this.columns[10].width = 80;
								meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
							}
							return value;
						}
					}
				],
//				 listeners: {
//					itemdblclick: function(dataview, index, item, e) {
//						me.finishAction();
//					},
//					 render: function(){
//						var me = this,
//							popup	= me.ownerCt.ownerCt
//						;
//						new Ext.util.KeyMap({
//							target: me.getEl(),
//							eventName : 'keyup',
//							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { if(popup.enterDelay===true){popup.enterDelay = false;return;}else{me.fireEvent('itemdblclick', me.getView());}}}]
//						});
//					}
//				}
			}
		;
		return grid;
	},

	/**
	 * 조회
	 */
	selectAction: function(){
		var  me    = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params);
		;
//		if (me.popup.apiurl && me.popup.apiurl.search ) {
//			store.getProxy().api.read = me.popup.apiurl.search ;
//		}
		store.load({
			 params:{param:JSON.stringify(param)}, scope:me,
			 callback:function(records, operation, success) {
				 if(records){
					 var deli_date = records[0].raw['deli_date'];
					 	deli_date = deli_date.substr(0, 4)+'-'+deli_date.substr(4,2)+'-'+deli_date.substr(6,2);
					me.down('[name=deli_date]').setValue(deli_date);
//					me.down('[name=fdat_spec]').setValue(records[0].raw['fdat_spec']);
					me.down('[name=pcod_numb]').setValue(records[0].raw['pcod_numb']);
				}
			}
		});
	},
//	/**
//	 * 확인 버튼 이벤트
//	 */
//	finishAction: function(){
//		var  me    = this,
//			 panel = me.down('grid'),
//			 selected = panel.getSelectionModel().getSelection()
//		;
//		if (selected.length === 0) {
//			resource.showError( '선택 된 데이터가 없습니다.'  );
//		} else {
//			me.setResponse(selected);
//		}
//	},

});
