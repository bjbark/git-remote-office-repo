Ext.define('module.custom.symct.prod.workentry.view.WorkCvicPopup', { extend: 'Axt.popup.Search',
	id		: 'lookup-symct-cvic-popup',
	alias	: 'widget.lookup-symct-wkctcvic-popup',
	store	: 'module.custom.symct.prod.workentry.store.WorkCvicPopup',
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
			form =
		{
			xtype : 'form-layout',
			region : 'center',
			border:false,
			dockedItems : [ me.searchForm() ] , items : [ me.createGrid() ]
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
	createGrid: function(){
		var me = this, grid =
		{
			xtype: 'grid-panel',
			header : false,
			region: 'center',
			cls: _global.options.work_book_tema+'grid',
			viewConfig: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			selModel: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
			store	: Ext.create( me.store ),
			paging	: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style',width:'150px',height:'35px;'},'-',
					{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style',width:'150px',height:'35px;'}
				]
			},
			columns:[
				{	dataIndex: 'line_stat'		, text : Language.get('line_stat'		,'상태')			, width : 80  , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat'), align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					},
					hidden:true
				},{ dataIndex: 'cvic_idcd'		, text : Language.get('cvic_idcd'		,'설비코드')	, width : 150 , align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명')		, width : 180,
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'abty_calc_yorn'	, text : Language.get('abty_calc_yorn'	,'능력산정')	, width : 150 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'cvic_spec'		, text : Language.get('cvic_spec'		,'설비규격')	, width : 180 , align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'cvic_stat_dvcd'	, text : Language.get('cvic_stat_dvcd'	,'설비상태')	, width : 150 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자')	, width : 200,
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'puch_cstm_name'	, text : Language.get('puch_cstm_name'	,'구매처명')	, width : 190,
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'vend_tele_numb'	, text : Language.get('vend_tele_numb'	,'구매처전화번호'), width : 200 , align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'afsv_tele_numb'	, text : Language.get('afsv_tele_numb'	,'AS전화번호')	, width : 200 , align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'mchn_numb'		, text : Language.get('mchn_numb'		,'기기번호')	, width : 150 , align : 'center',
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제조사명')	, width : 170,
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
				},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고')		, width : 150,
					renderer: function(value, meta){
						meta.style = 'font-size:3em !important;height:50px;line-height:50px;'; // applied style for DIV element
						return value;
					}
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
