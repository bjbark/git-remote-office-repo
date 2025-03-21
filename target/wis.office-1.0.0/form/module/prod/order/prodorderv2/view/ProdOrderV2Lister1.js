Ext.define('module.prod.order.prodorderv2.view.ProdOrderV2Lister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prodorderv2-lister1',
	store		: 'module.prod.order.prodorderv2.store.ProdOrderV21',

	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '<span class="write-button">지시서발행</span>', action : 'writeAction', cls: 'button1-style',
						hidden	: (_global.stor_id.toUpperCase()!= 'N1000NBOLT1000'?true:false)},
					{	text	: '마감/해지',
						menu	: [
							{	text : '마감', action : 'closeAction'		},
							{	text : '해지', action : 'closeCancelAction'	}
						]
					},
					'->','-' ,
					{	text : '<span class="write-button">입고등록</span>', action : 'prodIstt', cls: 'button1-style',
						hidden	: (_global.stor_id.toUpperCase() != 'N1000INKOP1000'?true:false)},
					{	text: Const.MODIFY.text , iconCls: Const.MODIFY.icon , handler : me.popup ,cls: 'button-style' },
					'-',
//					{	text : '<span class="write-button">외주발주서 발행</span>', action : 'writeAction3', cls: 'button1-style', width : 90,
//						hidden	: (_global.stor_id.toUpperCase() != 'N1000NBOLT1000'?true:false)},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style'	}

				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'상태'		) , width : 50  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos')
					},{	dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 150 , align : 'center',
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , width : 80  , align : 'center',
					},{ dataIndex: 'wkfw_idcd'		, text : Language.get('wkfw_idcd'		,'생산라인'	) , width : 100 , align : 'center' , hidden : true
					},{ dataIndex: 'bomt_degr'		, text : Language.get('bomt_degr'		,'BOM차수'	) , width : 70  , align : 'center' , hidden : true
					},{ dataIndex: 'strt_dttm'		, text : Language.get('strt_dttm'		,'착수예정'	) , width :  120 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'	) , width : 100 , align : 'left'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 200 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , width : 180 , align : 'left'
				// 2021.12.15 - 이강훈 - 수주수량 추가
					},{ dataIndex: 'acpt_qntt'		, text : Language.get('acpt_qntt'		,'수주수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
				// 2021.12.15 - 이강훈 - 삭제 : 생산수량(상세항목으로 이동)
				//	},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산수량'	) , width : 80  , xtype : 'numericcolumn', align : 'right', summaryType: 'sum'
				//	},{ dataIndex: 'insp_wkct_yorn'	, text : Language.get('insp_wkct_yorn'	,'검사여부'	) , width : 70  , align : 'center', xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
					}
				]
			}
		;
		return item;
	},

	popup : function(){
		var me = this,
			lister = me.up().up(),
			select = me.up().up().getSelectionModel().getSelection()
		;
		console.log(select);
		if(select.length < 1){
			Ext.Msg.alert("알림","수정하려는 지시를 선택해주세요.");
			return;
		}
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 60,
				labelStyle: 'text-align:right',
				width		: 280,
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('wkod_numb','지시번호'),
					name		: 'invc_numb',
					xtype		: 'textfield',
					labelWidth	: 50,
					width		: 180,
					readOnly	: true,
					value		: select[0].data.invc_numb,
					margin		: '0 0 10 20'
				},{	fieldLabel	: Language.get('indn_qntt','지시수량'),
					name		: 'indn_qntt1',
					xtype		: 'numericfield',
					labelWidth	: 50,
					width		: 180,
					margin		: '0 0 0 20'
				}
			],
			buttons: [
				{	text:'<span class="btnTemp" style="font-size:1em">확인</span>',
					cls: 'button-style',
					handler: function() {
						var me = this;
						var param = Ext.merge( this.up('form').getValues() );
						if(param.indn_qntt1==null || param.indn_qntt1 ==''){
							Ext.Msg.alert("알림","지시수량을 반드시 입력해주십시오.");
							return;
						}if(param.indn_qntt1 <= 0){
							Ext.Msg.alert("알림","지시수량을 다시 입력해주십시오.");
							return;
						}else{
							var new_invc_numb;
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/order/prodorderv2/set/qntt.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb: param.invc_numb,
										indn_qntt: param.indn_qntt1
									})
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									me.up('form').getForm().reset();
									me.up('window').hide();
									lister.getStore().reload();
								}
							});
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
					cls: 'button-style',
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '시작',
			closeAction: 'hide',
			width: 260,
			height: 140,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	}
});