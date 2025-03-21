/**
 */
Ext.define('lookup.popup.view.LottPopup', { extend: 'Axt.popup.Search',
	id: 'lookup-lott-popup',
	alias: 'widget.lookup-lott-popup',
	store: 'lookup.popup.store.LottPopup',
	title: Language.get('','Lot 번호 선택'),
	closable: true,
	autoShow: true,
	width: 800,
	height: 500,
	layout: {
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

	listeners:{
		show:function(){
			if(_global.hqof_idcd.toUpperCase()=="N1000SJFLV" || _global.hqof_idcd.toUpperCase()=="N1000SJUNG"){
				if(!this.popup.params.item_idcd){
					Ext.Msg.alert('알림','품목을 선택하여주세요.');
					this.hide();
				}
			}
		}
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
			dockedItems : [ me.searchForm() ],
			items : [ me.createGrid() ]
		};
		return form;
	},
	/**
	 * 검색폼
	 */
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
			xtype: 'grid-panel',
			header : false,
			region: 'center',
			viewConfig: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
			},
			selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
			store		: Ext.create(me.store),
			paging		: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
			columns:[
			    { text: Language.get('lott_numb','Lot 번호'	) , dataIndex: 'lott_numb',  width: 100  , align: 'left'},
				{ text: Language.get('item_code','코드'	) , dataIndex: 'item_code',  width: 80  , align: 'left'},
				{ text: Language.get('','현재고' 			) , dataIndex: 'stok_qntt',  width: 70  , align: 'right'	, xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.###'},
				{ text: Language.get('','입고누계'			) , dataIndex: 'istt_qntt',  width: 70  , align: 'right'	, xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.###'},
				{ text: Language.get('','출고누계'			) , dataIndex: 'ostt_qntt',  width: 70  , align: 'right'	, xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.###'},
				{ text: Language.get('','제조일자'			) , dataIndex: 'make_date',  width: 80  , align: 'center'},
				{ text: Language.get('','최종입고일자'		) , dataIndex: 'istt_date',  width: 80  , align: 'center'},
				{ text: Language.get('','최종출고일자'		) , dataIndex: 'ostt_date',  width: 80  , align: 'center'},
				{ text: Language.get('','비고'			) , dataIndex: 'user_memo',  width: 130  , align: 'center'},
				{ text: Language.get('','창고ID'			) , dataIndex: 'wrhs_idcd',  width: 80  , align: 'center'	, hidden : true},

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
							  {
								 key: Ext.EventObject.ENTER,
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
			param = Ext.merge( me.down('form').getValues() , {
			}, me.popup.params, {hq_id : _global.hq_id} )
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
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
		var me      = this,
			panel   = me.down('grid'),
			store   = panel.getStore(),
			selects = panel.getSelectionModel().getSelection(),
			request = []
		;
		if (selects.length === 0) {
			resource.showError( '선택 된 데이터가 없습니다.'  );
		} else {
			if(me.popup.params.dvcd != '1'){
				me.setResponse(selects);
			}else{
				var sum = 0;
				for (var i = (selects[0].index); i < store.getCount(); i++) {
					console.log(Number(store.getAt(i).get('stok_qntt')));
					sum += Number(store.getAt(i).get('stok_qntt'));
				}
				if((sum - me.popup.params.qntt) >= 0){
					me.setResponse(selects);
				}else{
					Ext.Msg.alert('알림','출고가능한 재고수량이 부족합니다.');
				}
			}
		}
	}
});
