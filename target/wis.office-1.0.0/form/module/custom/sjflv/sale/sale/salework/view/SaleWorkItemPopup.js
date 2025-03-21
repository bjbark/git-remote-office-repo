Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkItemPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-salework-item-popup',

	title		: '품목추가',
	closable	: true,
	autoShow	: true,
	width		: 1200 ,
	height		: 330,
	layout		: {
		type : 'border'
	},
	store	: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkItemPopup',
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this,
		tema	= ''
			;

		me.items = [ me.createForm(tema)];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function(tema) {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
//						{	text : '<span class="write-button">닫기</span>', scope: me, handler: me.close, cls: 'button-style', width: 80 , height	: 40,	} ,
					]
				}
			],
			dockedItems : [me.editorForm() ],
			items : [me.createGrid()]
		};
		return form;
	},


	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc2',
			hidden		: true,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtpye	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	xtype	: 'panel',
							layout	: 'vbox',
							border	: 0,
							items	: [
								{	xtype	: 'panel',
									layout	: 'hbox',
									border	: 0,
									items	: [
										{	fieldLabel	: Language.get('cstm','거래처'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cstm_name',
											width		: 250,
											pair		: 'cstm_idcd',
											clearable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-cstm-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
												}
											},
											listeners	: {
												change	: function() {
													var val = this.getValue();
													if(val=='' || val == null){
														me.down('[name=cstm_idcd]').reset();
													}
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : false
										},{	fieldLabel	: Language.get('','수주구분'),
											xtype		: 'lookupfield',
											name		: 'acpt_dvcd',
											width		: 155,
											hidden		: _global.options.mes_system_type.toUpperCase() != 'SJFLV',
											labelWidth	: 70,
											margin		: '0 0 0 35',
											lookupValue	: resource.lookup('acpt_dvcd'),
										}
									]
								},
							]
						},
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



	createGrid: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			header		: false,
			split		: true,
			region		: 'center',
			itemId		: 'grid1',
			height		: 300 ,
			viewConfig	: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
				markDirty: false,
			},
			selModel: {	selType: 'checkboxmodel', mode : 'SINGLE' },
			store	: Ext.create(me.store),
			plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{
		        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
		        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
		        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
		    }],
			paging	: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
			columns: [
//
				{	dataIndex:	'item_name'	, width: 150, align : 'left'	, text: Language.get( 'item_name'	, '품목'			)
				},{	dataIndex:	'item_code'	, width: 150, align : 'center'	, text: Language.get( 'item_code'	, '품목코드'		)
				},{	dataIndex:	'acpt_dvcd'	, width:  90, align : 'center'	, text: Language.get( 'acpt_dvcd'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'cstm_code'	, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'sale_amnt'	, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'item_name'	, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'cstm_name'	, width: 120, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		),hidden:true
				},{	dataIndex:	'deff_amnt'	, width: 100, align : 'right'	, text: Language.get( 'deff_amnt'	, '미발행금액'	), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'sply'		, width: 100, align : 'right'	, text: Language.get( 'sply'		, '발행금액'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'sply_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'vatx_amnt'			, width:  90, align : 'right'	, text: Language.get( ''	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'ttsm_amnt'			, width:  90, align : 'right'	, text: Language.get( ''	, '합계'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex: 'remk_text'			, minWidth: 200, flex:  1, align : 'left', text: Language.get( 'remk_text'	, '비고'		)
				},{	dataIndex:	'item_spec'		, width: 200, align : 'left'		, text: Language.get( 'item_spec'	, '규격'		),hidden:true
				},{	dataIndex:	'ostt_qntt'		, width: 200, align : 'left'		, text: Language.get( 'qntt'	, '수량'			),xtype:'numericcolumn',hidden:true
				},{	dataIndex:	'sply_pric'		, width: 200, align : 'left'		, text: Language.get( 'sply_pric'	, '단가'		),xtype:'numericcolumn',hidden:true
				},{	dataIndex:	'sply_amnt'		, width: 200, align : 'left'		, text: Language.get( 'sply_amnt'	, '공급가액'	),xtype:'numericcolumn',hidden:true
				},{	dataIndex:	'vatx_amnt'		, width: 200, align : 'left'		, text: Language.get( 'vatx_amnt'	, '세액'		),hidden:true
				},{	dataIndex:	'item_idcd'		, width: 200, align : 'left'		, text: Language.get( 'item_idcd'	, 'item_idcd'),hidden:true
				}

			],
			listeners: {
				render: function(){
					var me = this
					;
					var popup = me.up('form').ownerCt,
						form  = popup.down('[itemId=invc2]')
					;
//					form.getForm().loadRecord(popup.params.select);
					me.getStore().load({
						params : {
							param:JSON.stringify({
								invc_numb : popup.params.invc_numb,
								cstm_idcd : popup.params.cstm_idcd,
								acpt_dvcd : popup.params.acpt_dvcd,
								item_idcd : popup.params.item_idcd,
								})
								}
					});
				},
			}
		};
		return grid;
	},


	createGrid2: function(){
		var me = this,
		grid = {
			xtype		: 'grid-panel',
			header		: false,
			split		: true,
			region		: 'center',
			itemId		: 'grid2',
			height		: 300 ,
			viewConfig	: {
				loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask }),
				markDirty: false,
			},
			selModel: {	selType: 'checkboxmodel', mode : 'MULTI' },
			store	: Ext.create('module.custom.sjflv.sale.sale.salework.store.SaleWorkModifyPopup'),
			plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'},{
		        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
		        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
		        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
		    }],
			paging	: {
				xtype	: 'grid-paging',
				items	: [
					'->' ,
					{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
					{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
				]
			},
			columns: [
				{	dataIndex:	'item_name'		, width: 150, align : 'left'	, text: Language.get( 'item_name'	, '품목'			)
				},{	dataIndex:	'item_code'		, width: 150, align : 'center'	, text: Language.get( 'item_code'	, '품목코드'		)
				},{	dataIndex:	'cstm_code'		, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'sale_amnt'		, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'item_name'		, width:  90, align : 'center'	, text: Language.get( 'cstm_code'	, '거래처코드'	),hidden:true
				},{	dataIndex:	'cstm_name'		, width: 120, align : 'left'	, text: Language.get( 'cstm_name'	, '거래처명'		),hidden:true
				},{	dataIndex:	'deff_amnt'		, width: 100, align : 'right'	, text: Language.get( 'deff_amnt'	, '미발행금액'	), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'sply'			, width: 100, align : 'right'	, text: Language.get( 'sply'		, '발행금액'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'sply_amnt'		, width: 100, align : 'right'	, text: Language.get( ''	, '공급가'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'vatx_amnt'		, width:  90, align : 'right'	, text: Language.get( ''	, '부가세'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'ttsm_amnt'		, width:  90, align : 'right'	, text: Language.get( ''	, '합계'		), xtype : 'numericcolumn', summaryType: 'sum'
				},{	dataIndex:	'remk_text'		, minWidth: 200, flex:  1, align : 'left'		, text: Language.get( ''	, '비고'		)
				},{	dataIndex:	'item_spec'		, width: 200, align : 'left'		, text: Language.get( 'item_spec'	, '비고'		)
				},{	dataIndex:	'qntt'			, width: 200, align : 'left'		, text: Language.get( 'qntt'	, '비고'		)
				},{	dataIndex:	'sply_pric'		, width: 200,  align : 'left'		, text: Language.get( 'sply_pric'	, '비고'		)
				},{	dataIndex:	'sply_amnt'		, width: 200,  align : 'left'		, text: Language.get( 'sply_amnt'	, '비고'		)
				},{	dataIndex:	'vatx_amnt'		, width: 200,  align : 'left'		, text: Language.get( 'vatx_amnt'	, '비고'		)
				}
			],
		};
		return grid;
	},



	/**
	 * 버튼 이벤트
	 */
		finishAction: function( records ){
			var me = this,
			panel	= me.down('grid'),
			selects	= panel.getSelectionModel().getSelection(),
			request	= [],
			store	= Ext.ComponentQuery.query('module-salework-modify-popup');
//			master = Ext.ComponentQuery.query('module-sjflv-salework-lister-master')[0];

		;
//			var value = form.getValues();
			if ( selects.xtype ){
				selects = grid.getSelectionModel().getSelection() ;
			}
			if (selects.length === 0) {
				resource.showError( '선택 된 데이터가 없습니다.'  );
			}
		 else{
			if (me.popup.apiurl && me.popup.apiurl.master) {

				Ext.each( selects , function( eachrow ){
					request.push({
						item_name : eachrow.get('item_name'),
						cstm_idcd : eachrow.get('cstm_idcd'),
						item_idcd : eachrow.get('item_idcd'),
						});
				});
				param = Ext.merge( me.popup.params, {
					records : request
				});
//				{master : value};
				store.reload();
//				store.getProxy().api.read = me.popup.apiurl.master ;
			} else {
				me.setResponse(selects);
			}
		}
	}
});
