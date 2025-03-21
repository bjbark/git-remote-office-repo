Ext.define('module.custom.iypkg.item.productmast.view.ProductMastLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-productmast-lister',
	store		: 'module.custom.iypkg.item.productmast.store.ProductMast',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					{	text : '<span class="write-button">제품코드 복사</span>'	, action : 'copyAction'		, cls: 'button1-style'	}
					, '-'
					, '->'
					,{	text : '<span class="write-button">이미지 크게보기</span>'	, action : 'ImgeAction'	, cls: 'button1-style'	,width:  90} , '-',
					,{	text : '<span class="write-button">단가 업로드</span>'	, action : 'pricAction'		, cls: 'button-style', hidden: _global.hqof_idcd.toUpperCase() == 'N1000IYPKG'?false:true}
					,{	text : '<span class="write-button">단가 일괄변경</span>'	, action : 'pricAction2'	, handler:me.popup, cls: 'button-style', hidden: _global.hqof_idcd.toUpperCase() == 'N1000IYPKG'?true:false}
				]
			};
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'prod_code'			, width: 100, align : 'center',	text: Language.get( 'prod_code'		, '제품코드'		), summaryType: 'count'
					},{	dataIndex:	'prod_name'			, width: 210, align : 'left'  ,	text: Language.get( 'prod_name'		, '제품명'		)
					},{	dataIndex:	'prod_leng'			, width:  50, align : 'right' ,	text: Language.get( 'prod_leng'		, '장'			)
					},{	dataIndex:	'prod_widh'			, width:  50, align : 'right' ,	text: Language.get( 'prod_widh'		, '폭'			)
					},{	dataIndex:	'prod_hght'			, width:  50, align : 'right' ,	text: Language.get( 'prod_hght'		, '고'			)
					},{	dataIndex:	'pqty_pric'			, width:  50, align : 'right' ,	text: Language.get( 'pqty_pric'		, '단가/개'		), xtype: 'numericcolumn'
					}
				]
			};
		return item;
	},
	popup:function(){
		var	me = this,
			form,win
		;
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 50,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('cstm','거래처'),
					xtype		: 'popupfield',
					name		: 'cstm_name',
					pair		: 'cstm_idcd',
					editable	: true,
					clearable	: true,
					enableKeyEvents	: true,
					allowBlank	: true,
//						required	: true,
					popup		: {
						select	: 'SINGLE',
						widget	: 'lookup-cstm-popup',
						params	:{
							 sale_cstm_yorn:1
						},
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('cstm_name'));
							pairField.setValue(records[0].get('cstm_idcd'));
							setTimeout(function(){
								form.down('[name=per_chk]').focus(true , 10)
							}, 50)
						}
					}
				},{ xtype : 'textfield', name : 'cstm_idcd', hidden : true
				},{	fieldLabel	: Language.get('per_chk','변경구분'),
					name		: 'per_chk'  ,
					xtype		: 'lookupfield',
					lookupValue	: [['0','퍼센트'],['1','가격']],
					value		: '0',
					enableKeyEvents : true,
					listeners	:{
						keydown : function(self, e) {
							if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
								form.down('[name=percent]').focus(true , 10)
							}
							this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
								scope: this,
								key: Ext.EventObject.TAB,
								shift:true,
								fn: function () {
									form.down('[name=cstm_name]').focus(true , 10)
								}
							});
						}
					}
				},{	fieldLabel	: Language.get('percent','변경값'),
					name		: 'percent'  ,
					xtype		: 'numericfield',
					value		: 0,
					enableKeyEvents : true,
					listeners	:{
						keydown : function(self, e) {
							if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
								form.down('[name=chk]').focus(true , 10)
							}
							this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
								scope: this,
								key: Ext.EventObject.TAB,
								shift:true,
								fn: function () {
									form.down('[name=per_chk]').focus(true , 10)
								}
							});
						}
					}
				},{	fieldLabel	: Language.get('chk','절삭구분'),
					name		: 'chk'  ,
					xtype		: 'lookupfield',
					lookupValue	: [['0','반올림'],['1','절삭']],
					value		: '1',
					enableKeyEvents : true,
					listeners	:{
						keydown : function(self, e) {
							if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
								form.down('[name=cut]').focus(true , 10)
							}
							this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
								scope: this,
								key: Ext.EventObject.TAB,
								shift:true,
								fn: function () {
									form.down('[name=percent]').focus(true , 10)
								}
							});
						}
					}
				},{	fieldLabel	: Language.get('cut','절삭범위'),
					name		: 'cut'  ,
					xtype		: 'numericfield',
					value		: 0,
					enableKeyEvents : true,
					listeners: {
						render: function(c) {
							Ext.QuickTips.register({
								target: c.getEl(),
								text: 'ex) 0 이상은 소수점 자리수 , 0 이하는 정수 자리수<br> 1 : 소수점 첫번째 자리, 0 : 정수 첫번째 자리, -1 정수 10의 자리',
								enabled: true,
								showDelay: 20,
								trackMouse: true,
								autoShow: true
							});
						},
						keydown : function(self, e) {
							if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
								var btn = form.down('[action=button_yes]');
								btn.fireHandler();


							}
							this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
								scope: this,
								key: Ext.EventObject.TAB,
								shift:true,
								fn: function () {
									form.down('[name=chk]').focus(true , 10)
								}
							});
						}
					}
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:1em">확인</span>',
					action:'button_yes',
					cls: 'button-style',
					handler: function() {
						var values = form.getValues();
						var msg = '';
						console.log(values.cut);
						if(values.cstm_idcd == ''){
							msg = '거래처를 선택해주세요.';
						}else if(values.per_chk == ''){
							msg = '변경구분을 선택해주세요.';
						}else if(values.percent == undefined){
							msg = '변경값을 선택해주세요.';
						}else if(values.chk==''){
							msg = '절삭구분을 선택해주세요.';
						}else if(values.cut  == undefined){
							msg = '절삭범위를 선택해주세요.';
						}

						if(msg == ''){
							Ext.Msg.confirm("확인", "일괄변경 하시겠습니까?", function(button) {
								if (button == 'yes') {
									Ext.Ajax.request({
										url		: _global.location.http() + '/custom/iypkg/item/productmast/set/price.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id		: _global.stor_id,
												cstm_idcd	: values.cstm_idcd,
												percent		: values.percent,
												cut			: values.cut,
												per_chk		: values.per_chk,
												chk			: values.chk,
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
												form.getForm().reset();
												this.up('window').destroy();
											}
										},
										failure : function(result, request) {
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									});
								}
							});
						}else{
							Ext.Msg.error(msg);
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
					cls: 'button-style',
					handler: function() {
						form.getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:13px; color:black;">단가 일괄변경</span>',
			closeAction: 'hide',
			width: 250,
			height: 230,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	}

 });