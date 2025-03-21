/**
 */
Ext.define('module.custom.sjflv.stock.isos.ostttrntmast.view.OsttTrntMastSearchPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-ostttrntmast-popup',
	store	: 'module.custom.sjflv.stock.isos.ostttrntmast.store.OsttTrntMastSearchPopup',

	title	: Language.get('','출고목록'),
	closable: true,
	autoShow: true,
	width	: 1200,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
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
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
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
														emptyText	: '',
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
							//},{
							//	xtype : 'container'  , layout: 'border', border : 0 , height: 1  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
							}
							],
				layout: { type: 'vbox' },
				fieldDefaults: { height : 23, width : 260, labelWidth : 60, labelSeparator : '' },
				items :	[
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '2 0 2 22',
						items	: [
						{	fieldLabel	: Language.get('','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 150,
								labelWidth	: 50,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 10,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								margin		: '0 0 0 5',
								clearable	: true
							},{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								margin		: '0 0 0 40',
								width		: 150,
								labelWidth	: 50,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								margin		: '0 0 0 5',
								width		: 116,
								labelWidth	: 10,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: '',
								clearable	: true,
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
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
//					{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat')
					{	dataIndex: 'invc_numb'		, text : Language.get('shpm_numb'		,'출고번호'		) , width : 100 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 150
					},{ dataIndex: 'dlvy_cstm_name'	, text : Language.get('dlvy_cstm_name'	,'납품처명'		) , width : 150
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width : 100 , align : 'center', hidden: true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('shpm_date'		,'출고일자'		) , width : 80  , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'출고담당'		) , width : 100 , align : 'center'
					},{ dataIndex: 'ostt_item_list'	, text : Language.get('ostt_item_list'	,'비고'		) , flex  : 100
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					 render: function(){
						var me = this ;
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
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			param	= Ext.merge(me.down('form').getValues(),
								{hq_id : _global.hq_id },
								me.popup.params,
								{line_stat : ''}
					)
		;

		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
				 if(records){
						me.down('grid').getSelectionModel().select(0);
				}
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me		= this,
			panel	= me.down('grid'),
			selects	= panel.getSelectionModel().getSelection(),
			request	= []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {

				Ext.each( selects , function( eachrow ){
					request.push({
//						wrhs_idcd : eachrow.get('wrhs_idcd')
					});
				});
				var store = Ext.create(me.store);
				param = Ext.merge( me.popup.params, {
					records : request
				});
				store.getProxy().api.read = me.popup.apiurl.master ;
				store.load({
					params	: {param:JSON.stringify(param)},
					scope	: me,
					callback: function(records, operation, success) {
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
