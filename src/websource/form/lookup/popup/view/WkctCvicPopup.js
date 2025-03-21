Ext.define('lookup.popup.view.WkctCvicPopup', { extend: 'Axt.popup.Search',
	id		: 'lookup-cvic-popup',
	alias	: 'widget.lookup-wkctcvic-popup',
	store	: 'lookup.popup.store.WkctCvicPopup',
	title	: Language.get( 'cvic_mast' , '생산설비 찾기') ,
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
		var me = this,
			tema	= ''
		;
		if(me.popup.params.tema){
			tema = me.popup.params.tema+'grid';
		}
		me.items = [me.createForm(tema)];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(tema){
		var me = this,
			form =
		{
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] , items : [ me.createGrid(tema) ]
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
										},{	name	: 'emp_nm',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											emptyText	: '생산설비코드 또는 생산설비명을 입력하세요....',
											value	: me.popup.params.find,
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
	createGrid: function(tema){
		var me = this, grid =
		{
			xtype: 'grid-panel',
			header : false,
			region: 'center',
			viewConfig: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
			store	: Ext.create( me.store ),
			paging	: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style'}
				]
			},
			cls			: tema,
			columns:[
				{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 50  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center',
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[0].width = 140;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드')		, width : 80 , align : 'center',
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[0].width = 140;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
				},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명')		, width : 170,
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[0].width = 140;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
//				},{ dataIndex: 'abty_calc_yorn'	, text : Language.get('abty_calc_yorn'	,'능력산정')		, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
				},{ dataIndex: 'cvic_spec'		, text : Language.get('cvic_spec'		,'설비규격')		, width : 150 , align : 'center',
					renderer: function(value, meta){
						if(me.popup.params.tema){
							this.columns[0].width = 140;
							meta.style = 'font-size:2em !important;height:30px;line-height:30px;'; // applied style for DIV element
						}
						return value;
					}
//				},{ dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태')		, width : 100 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
//				},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자')		, width : 80
//				},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명')		, width : 170
//				},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'), width : 170 , align : 'center'
//				},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호')	, width : 170 , align : 'center'
//				},{ dataIndex: 'mchn_numb'		, text : Language.get('mchn_numb'		,'기기번호')		, width : 110 , align : 'center'
//				},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조사명')		, width : 170
				},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')			, flex  : 100
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
			param = Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
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
				if(records){
					me.down('grid').getSelectionModel().select(0);
				}
			}
		});
	},

	/**
	 * 선택
	 */
	finishAction: function(){
		var me    = this,
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
						cvic_idcd	: eachrow.get('cvic_idcd' )
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
