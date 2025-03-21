/**
 */
Ext.define('lookup.popup.project.BonsaPopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.lookup-bonsa-popup',
	store	: 'lookup.popup.project.store.BonsaPopup' ,

	title	: Language.get('hq_popup','본사 선택'),
	requires:
	[
	 	'lookup.popup.project.ProjInfoPopup'
	],

	closable: true,
	autoShow: true,
	width	: 700,
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
		var me = this, form =
		{
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] ,
			items : [ me.createGrid() ]
		};
		return form;
	},
	/**
	 * 검색폼
	 */
	searchForm: function(){
		var me = this, form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype : 'toolbar',
					layout: { type: 'vbox' },
					dock  : 'top',
					items : [
						{	xtype	: 'container',
							layout	: { type: 'hbox' },
							region	: 'center',
							width	: '100%',
							height  : 40,
							margin	: '0 20 0 20',
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
													emptyText : '청약명칭 또는 청약코드를 입력하세요..'
												},{	xtype		: 'popupfield',
													fieldLabel	: Language.get('project','Project'),
													name		: 'pjt_nm',
													pair		: 'pjt_id',
													labelAlign	: 'right',
													margin		: '3 10 0 0',
													labelWidth	: 59,
													width		: 200,
													allowBlank	: true,
													popup		: {
														select	: 'SINGLE',
														widget	: 'lookup-projinfo-popup',
														params	: { row_sts : 0 },
														result	:  function(records, nameField, pairField ){
															nameField.setValue(records[0].get('pjt_nm'));
															pairField.setValue(records[0].get('pjt_id'));
														}
													}
												},{	xtype  : 'textfield',
													name   : 'pjt_id'  ,
													hidden : true
											},{
											}
										]
										},
									]
								},{	xtype	: 'button'     , scope: me, handler: me.selectAction,  width   : 40, height 	: 36,region : 'north', margin : '2 2 0 0',
									style	: 'background:url("../../../resource/img/btn_search_icon.png")'
								}
							]
						}
					]
				},{	xtype : 'container'  , layout: 'border', border : 0 , height: 3
				}
			],
			layout		: { type: 'vbox' },
			fieldDefaults: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items		:	[]
		};
		return form;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this, grid =
		{
			xtype		: 'grid-panel',
			header		: false,
			region		: 'center',
			viewConfig	: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
			store		: Ext.create( me.store ),
			paging		: {
				xtype: 'grid-paging',
				items:[
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
			columns:[
				{	text: Language.get('hq_id'	, 'Code'    )			, dataIndex: 'hq_id'	, width: 100
				},{	text: Language.get('hq_nm'	, 'Head office name')	, dataIndex: 'hq_nm'	, width: 150
				},{	text: Language.get('hq_sts'	, 'Stauts')				, dataIndex: 'hq_sts'	, width:  70  , xtype : 'lookupcolumn' , lookupValue : resource.getList('ctrl_sts') , align : 'center'
				},{	text: Language.get('project', 'Project'    )		, dataIndex: 'pjt_nm'	, width: 150
				}
			],
			 listeners: {
				itemdblclick: function(dataview, index, item, e) {
					me.finishAction();
				},
				render: function(){
					var me = this
					;
					new Ext.util.KeyMap({
						target: me.getEl(),
						eventName : 'keyup',
						binding:[
							{	key: Ext.EventObject.ENTER,
								fn: function(key,e){
									me.fireEvent('itemdblclick', me.getView() );
								}
							}
						]
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
		var me    = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				if (me.popup.values && me.popup.values.barcode) {
					delete me.popup.values.barcode ;
				}
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	 finishAction: function(){
		var  me    = this,
			 panel    = me.down('grid'),
			 selects = panel.getSelectionModel().getSelection(),
			 request = []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if (me.popup.apiurl && me.popup.apiurl.master) {
				Ext.each( selects , function( eachrow ){
					request.push({
						hq_id	: eachrow.get('hq_id'),
						hq_nm	: eachrow.get('hq_nm'),
						project	: eachrow.get('project')
					});
				});
				var store = Ext.create( me.store );
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
