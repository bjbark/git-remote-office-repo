/**
 */
Ext.define('module.prod.plan.prodplan.view.ProdPlanMoldPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-prod-mold-popup',
	alias	: 'widget.lookup-prod-mold-popup',
	store	: 'module.prod.plan.prodplan.store.ProdPlanMoldPopup',

	title	: Language.get('acpt_numb','금형 코드')+'찾기',
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
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm(tema) ],
				items		: [ me.createGrid(tema) ]  //me.createToolbar(),
			};
		return form;
	},

	searchForm: function(tema){
		var me = this,
			form = {
			xtype		: 'form-search',
			cls: _global.options.work_book_tema+'grid',
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
											emptyText	: Language.get('acpt_numb', '금형코드'	)+' 또는 '+Language.get('acpt_case_name', '금형명')+'을 입력하세요....',
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
						{	xtype	: 'button',
							scope	: me,
							handler	: me.selectAction,
							width	: 40,
							height	: 36,
							region	: 'north',
							margin	: '2 2 0 0',
							action	: Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout			: { type: 'vbox' },
			fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items			: [
				// 기타 검색 조건이 필요한 경우
			]
		};
		return form;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(tema){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				cls: tema,
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
					{	text: Language.get('mold_idcd'		, '창고id'	)		, dataIndex: 'mold_idcd'	, width : 150, hidden	: true,
					},{	text: Language.get('acpt_numb'		, '금형코드'	)		, dataIndex: 'mold_code'	, width :  80, align	: 'center',
					},{	text: Language.get('acpt_case_name'	, '금형명'	)		, dataIndex: 'mold_name'	, flex  : 1,
					},{	text: Language.get('mold_spec'		, '규격'		)		, dataIndex: 'mold_spec'	, width : 120,
					},{	text: Language.get('used_tons'		, '사용톤수'	)		, dataIndex: 'used_tons'	, width :  80,
					},{	text: Language.get('cavity'			, 'CAVITY'	)		, dataIndex: 'cavity'		, width :  80,
					},{	text: Language.get('mtrl_name'		, '원재료'	)		, dataIndex: 'mtrl_name'	, width :  80,
					},{	text: Language.get('mold_grad_name'	, 'GRADE'	)		, dataIndex: 'mold_grad_name', width : 80, hidden	: false
					},{	text: Language.get('cstm_name'		, '구매처명'	)		, dataIndex: 'cstm_name'	, width : 120, hidden:true,
					},{	text: Language.get('afsv_tele_numb'	, 'AS전화번호')		, dataIndex: 'afsv_tele_numb', width : 160,hidden:true,
					},{	text: Language.get('runr_wigt'		, '런너중량'	)		, dataIndex: 'runr_wigt', width : 120, hidden	: true
					},{	text: Language.get('prod_wigt'		, '제품중량'	)		, dataIndex: 'prod_wigt', width : 120, hidden	: true
					},{	text: Language.get('cycl_time'		, '회전시간'	)		, dataIndex: 'cycl_time', width : 120, hidden	: true
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
								me.popup.params
					)
		;
		console.log(me.popup.params);
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
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
						mold_idcd : eachrow.get('mold_idcd')
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
